import { processFile, parseCSV } from './dataProcessor.js';
import ExcelJS from 'exceljs';

// ── DOM references ────────────────────────────────────────────────────────────
const $ = sel => document.querySelector(sel);
const $$ = sel => document.querySelectorAll(sel);

const fileListEl  = $('#file-list');
const emptyHint   = $('#empty-hint');
const logArea     = $('#log-area');
const progressBar = $('#progress-bar');
const statusText  = $('#status-text');
const fileInput   = $('#file-input');
const btnAdd      = $('#btn-add');
const btnClear    = $('#btn-clear');
const btnRun      = $('#btn-run');
const btnExport   = $('#btn-export');

// ── State ─────────────────────────────────────────────────────────────────────
let fileQueue    = []; // [{ file: File, id: string }]
let idCounter    = 0;
let isProcessing = false;

function resetProcessedState() {
  fileQueue.forEach(f => {
    delete f.processedBlob;
  });
  if (btnExport) btnExport.disabled = true;
  updatePreview();
}

// ── Logging ───────────────────────────────────────────────────────────────────
function timestamp() {
  return new Date().toLocaleTimeString('en-GB', { hour12: false });
}

function appendLog(msg) {
  const div = document.createElement('div');
  div.className = 'opacity-80';
  div.innerHTML = `<span class="ts">[${timestamp()}]</span> ${msg}`;
  logArea.appendChild(div);
  logArea.scrollTop = logArea.scrollHeight;
}

function setStatus(text) {
  statusText.textContent = text;
}

// ── Task cards ────────────────────────────────────────────────────────────────
function initCards() {
  $$('.task-card').forEach(card => {
    card.addEventListener('click', e => {
      if (e.target.tagName === 'INPUT') return;
      card.classList.toggle('card-active');
      resetProcessedState();
    });
  });
}

function getActiveTasks() {
  const tasks = new Set();
  $$('.task-card.card-active').forEach(card => {
    if (card.dataset.task) tasks.add(card.dataset.task);
  });
  return tasks;
}

function getParams() {
  return {
    dateFormat:  $('#inp-date-fmt').value  || 'DD/MM/YYYY',
    timeFormat:  $('#inp-time-fmt').value  || 'HH:mm:ss',
    threshold:   parseInt($('#inp-threshold').value, 10) || 20,
    activeTasks: getActiveTasks(),
  };
}

// ── File queue ────────────────────────────────────────────────────────────────
function addFiles(files) {
  resetProcessedState();
  for (const file of files) {
    const ext = file.name.split('.').pop().toLowerCase();
    if (!['xlsx', 'xls', 'csv'].includes(ext)) continue;
    const exists = fileQueue.some(f => f.file.name === file.name && f.file.size === file.size);
    if (exists) continue;
    fileQueue.push({ file, id: `f${idCounter++}` });
  }
  renderFileList();
}

function removeFile(id) {
  resetProcessedState();
  fileQueue = fileQueue.filter(f => f.id !== id);
  renderFileList();
}

function clearFiles() {
  resetProcessedState();
  fileQueue = [];
  renderFileList();
  progressBar.style.width = '0%';
  setStatus('SYSTEM READY • IDLE');
}

// ── Data Preview ──────────────────────────────────────────────────────────────
async function updatePreview() {
  const previewTable = $('#preview-table');
  const previewEmpty = $('#preview-empty');
  const previewHeader = $('#preview-header');
  const previewTbody = $('#preview-tbody');
  const previewBadge = $('#preview-badge');

  if (fileQueue.length === 0) {
    previewTable.classList.add('hidden');
    previewEmpty.classList.remove('hidden');
    if (previewBadge) previewBadge.classList.add('hidden');
    previewEmpty.innerHTML = `
      <span class="material-symbols-outlined text-3xl mb-2">table_chart</span>
      Awaiting file import to preview data...
    `;
    return;
  }

  const selectedItem = fileQueue[0];
  const isProcessed = !!selectedItem.processedBlob;
  const fileToPreview = isProcessed ? selectedItem.processedBlob : selectedItem.file;

  if (previewBadge) {
    previewBadge.classList.remove('hidden');
    if (isProcessed) {
      previewBadge.textContent = 'PROCESSED PREVIEW';
      previewBadge.className = 'text-[9px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/20';
    } else {
      previewBadge.textContent = 'ORIGINAL PREVIEW';
      previewBadge.className = 'text-[9px] font-bold px-2 py-0.5 rounded-full bg-primary/20 text-primary border border-primary/20';
    }
  }

  // Show loading state
  previewTable.classList.add('hidden');
  previewEmpty.classList.remove('hidden');
  previewEmpty.innerHTML = `
    <span class="material-symbols-outlined text-3xl mb-2 animate-spin">sync</span>
    Loading preview data...
  `;

  try {
    const workbook = new ExcelJS.Workbook();
    
    if (!isProcessed && selectedItem.file.name.toLowerCase().endsWith('.csv')) {
      const text = await fileToPreview.text();
      // Only parse first 30 lines for preview speed
      const lines = text.split(/\r?\n/).slice(0, 30);
      const csvRows = parseCSV(lines.join('\n'));
      if (csvRows.length === 0) throw new Error("Empty CSV file");
      
      renderPreviewData(csvRows[0], csvRows.slice(1));
    } else {
      await workbook.xlsx.load(await fileToPreview.arrayBuffer());
      const sheet = workbook.worksheets[0];
      if (!sheet) throw new Error("No worksheets found in Excel");
      
      const rows = [];
      const headerRow = sheet.getRow(1);
      const headers = [];
      headerRow.eachCell({ includeEmpty: true }, cell => {
        headers.push(cell.value !== null && cell.value !== undefined ? String(cell.value) : '');
      });
      
      const maxRowsToPreview = Math.min(sheet.rowCount, 15);
      for (let r = 2; r <= maxRowsToPreview; r++) {
        const rowVal = [];
        const row = sheet.getRow(r);
        for (let c = 1; c <= headerRow.cellCount; c++) {
          const val = row.getCell(c).value;
          let cellText = '';
          if (val instanceof Date) {
            const y = val.getUTCFullYear();
            const m = String(val.getUTCMonth() + 1).padStart(2, '0');
            const d = String(val.getUTCDate()).padStart(2, '0');
            const hh = String(val.getUTCHours()).padStart(2, '0');
            const mm = String(val.getUTCMinutes()).padStart(2, '0');
            const ss = String(val.getUTCSeconds()).padStart(2, '0');
            const hasTime = val.getUTCHours() !== 0 || val.getUTCMinutes() !== 0 || val.getUTCSeconds() !== 0;
            cellText = hasTime ? `${y}-${m}-${d} ${hh}:${mm}:${ss}` : `${y}-${m}-${d}`;
          } else if (val && typeof val === 'object' && val.result !== undefined) {
            cellText = String(val.result);
          } else if (val !== null && val !== undefined) {
            cellText = String(val);
          }
          rowVal.push(cellText);
        }
        rows.push(rowVal);
      }
      renderPreviewData(headers, rows);
    }
  } catch (err) {
    previewTable.classList.add('hidden');
    previewEmpty.classList.remove('hidden');
    previewEmpty.innerHTML = `
      <span class="material-symbols-outlined text-3xl mb-2 text-red-400">error</span>
      <span class="text-red-400 font-semibold">Failed to load preview:</span>
      <span class="text-on-surface-variant text-[11px] mt-1 text-center max-w-[250px] truncate">${err.message}</span>
    `;
  }
}

function renderPreviewData(headers, rows) {
  const previewTable = $('#preview-table');
  const previewEmpty = $('#preview-empty');
  const previewHeader = $('#preview-header');
  const previewTbody = $('#preview-tbody');

  previewHeader.innerHTML = '';
  previewTbody.innerHTML = '';

  if (!headers || headers.length === 0) {
    throw new Error("No columns found");
  }

  // Create headers
  headers.forEach(h => {
    const th = document.createElement('th');
    th.className = 'px-4 py-2.5 text-xs font-semibold text-on-surface-variant bg-surface-container-high border-b border-white/10 select-none';
    th.textContent = h;
    previewHeader.appendChild(th);
  });

  // Create rows
  rows.forEach(r => {
    const tr = document.createElement('tr');
    tr.className = 'hover:bg-white/5 transition-colors';
    headers.forEach((_, idx) => {
      const td = document.createElement('td');
      td.className = 'px-4 py-2 text-xs text-on-surface border-b border-white/5 truncate max-w-[200px]';
      td.textContent = r[idx] !== undefined ? r[idx] : '';
      tr.appendChild(td);
    });
    previewTbody.appendChild(tr);
  });

  previewEmpty.classList.add('hidden');
  previewTable.classList.remove('hidden');
}

function renderFileList() {
  fileListEl.querySelectorAll('.file-item').forEach(el => el.remove());

  if (!fileQueue.length) {
    emptyHint.classList.remove('hidden');
    updatePreview();
    return;
  }
  emptyHint.classList.add('hidden');

  for (const { file, id } of fileQueue) {
    const kb   = file.size / 1024;
    const size = kb < 1024 ? `${kb.toFixed(0)} KB` : `${(kb / 1024).toFixed(1)} MB`;

    const item = document.createElement('div');
    item.className = 'file-item flex items-center justify-between p-3 bg-surface-container-lowest rounded-lg group hover:bg-white/5 transition-colors';
    item.dataset.id = id;
    item.innerHTML = `
      <div class="flex items-center gap-3 min-w-0">
        <span class="material-symbols-outlined text-secondary shrink-0">file_present</span>
        <div class="flex flex-col min-w-0">
          <span class="text-sm text-on-surface font-medium truncate">${file.name}</span>
          <span class="text-[10px] text-on-surface-variant">${size} &bull; Ready</span>
        </div>
      </div>
      <button class="file-remove opacity-0 group-hover:opacity-100 p-1.5 hover:bg-red-500/10 hover:text-red-400 rounded transition-all" title="Remove">
        <span class="material-symbols-outlined text-sm">close</span>
      </button>
    `;
    item.querySelector('.file-remove').addEventListener('click', () => removeFile(id));
    fileListEl.appendChild(item);
  }
  updatePreview();
}

// ── Drag & drop ───────────────────────────────────────────────────────────────
function initDragDrop() {
  ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(evt =>
    document.body.addEventListener(evt, e => { e.preventDefault(); e.stopPropagation(); })
  );

  ['dragenter', 'dragover'].forEach(evt =>
    document.body.addEventListener(evt, () =>
      document.body.classList.add('ring-2', 'ring-primary', 'ring-inset')
    )
  );

  ['dragleave', 'drop'].forEach(evt =>
    document.body.addEventListener(evt, () =>
      document.body.classList.remove('ring-2', 'ring-primary', 'ring-inset')
    )
  );

  document.body.addEventListener('drop', e => {
    const files = e.dataTransfer.items
      ? [...e.dataTransfer.items].filter(i => i.kind === 'file').map(i => i.getAsFile())
      : [...e.dataTransfer.files];
    if (files.length) addFiles(files);
  });
}

// ── File input button ─────────────────────────────────────────────────────────
function initFileInput() {
  btnAdd.addEventListener('click', () => fileInput.click());
  fileInput.addEventListener('change', e => {
    if (e.target.files.length) addFiles(Array.from(e.target.files));
    fileInput.value = '';
  });
}

// ── Pipeline ──────────────────────────────────────────────────────────────────
async function runPipeline() {
  if (isProcessing) return;
  if (!fileQueue.length)          { alert('Please add files first!'); return; }

  const params = getParams();
  if (!params.activeTasks.size)   { alert('Please enable at least one task!'); return; }

  isProcessing = true;
  btnRun.disabled = true;
  btnRun.innerHTML = `
    <svg class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
    </svg>
    PROCESSING...
  `;
  setStatus('⏳ PROCESSING...');
  progressBar.style.width = '0%';
  if (btnExport) btnExport.disabled = true;

  const total = fileQueue.length;
  appendLog(`>>> PIPELINE STARTED: ${total} file(s), ${params.activeTasks.size} task(s).`);

  let successCount = 0;
  for (let i = 0; i < total; i++) {
    const { file } = fileQueue[i];
    const base = i / total;

    try {
      const blob = await processFile(
        file,
        params,
        msg => appendLog(msg),
        p => { progressBar.style.width = `${Math.round((base + p / total) * 100)}%`; }
      );

      fileQueue[i].processedBlob = blob;
      successCount++;
    } catch (err) {
      appendLog(`[!] ERROR in ${file.name}: ${err.message}`);
    }
  }

  progressBar.style.width = '100%';
  
  if (successCount > 0) {
    appendLog(`>>> PIPELINE COMPLETED. ${successCount}/${total} file(s) processed and cached.`);
    setStatus('✅ READY TO EXPORT');
    if (btnExport) btnExport.disabled = false;
  } else {
    appendLog('>>> PIPELINE FAILED. No files processed successfully.');
    setStatus('❌ PROCESSING FAILED');
  }

  btnRun.disabled = false;
  btnRun.innerHTML = `
    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
    RUN PIPELINE
  `;
  isProcessing = false;

  updatePreview();
}

async function exportFiles() {
  const filesToExport = fileQueue.filter(f => f.processedBlob);
  if (filesToExport.length === 0) {
    alert('No processed files to export! Please run pipeline first.');
    return;
  }

  appendLog(`>>> EXPORT STARTED: ${filesToExport.length} file(s).`);
  for (const { file, processedBlob } of filesToExport) {
    const arrayBuffer = await processedBlob.arrayBuffer();
    const uint8 = new Uint8Array(arrayBuffer);
    const filename = `Fixed_${file.name.replace(/\.[^.]+$/, '')}.xlsx`;

    try {
      const { invoke } = await import('@tauri-apps/api/core');
      appendLog(`[ ] Opening save dialog for ${filename}...`);
      const savedPath = await invoke('save_file', {
        filename,
        content: Array.from(uint8)
      });
      appendLog(`[✓] Saved file to: ${savedPath}`);
    } catch (err) {
      if (err === 'Save cancelled') {
        appendLog(`[!] Save cancelled by user.`);
        continue;
      }
      appendLog(`[!] Local save failed: ${err}. Falling back to browser download...`);
      const url = URL.createObjectURL(processedBlob);
      const a   = document.createElement('a');
      a.href     = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  }
  appendLog('>>> EXPORT COMPLETED.');
}

// ── Window controls (Tauri / browser fallback) ────────────────────────────────
async function initWindowControls() {
  try {
    const { getCurrentWindow } = await import('@tauri-apps/api/window');
    const win = getCurrentWindow();
    $('#btn-minimize').addEventListener('click', () => win.minimize());
    $('#btn-maximize').addEventListener('click', () => win.toggleMaximize());
    $('#btn-close').addEventListener('click',    () => win.close());
    appendLog('[✓] Window controls initialized successfully.');
  } catch (err) {
    appendLog('[!] Failed to init window controls: ' + err.message);
    // Browser mode fallback
    $('#btn-minimize').addEventListener('click', () => {});
    $('#btn-maximize').addEventListener('click', () =>
      document.fullscreenElement
        ? document.exitFullscreen()
        : document.documentElement.requestFullscreen()
    );
    $('#btn-close').addEventListener('click', () => window.close());
  }
}

// ── Init ──────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initCards();
  initDragDrop();
  initFileInput();
  initWindowControls();

  // Stamp the initial log entry's timestamp
  $$('.ts').forEach(el => { if (!el.textContent) el.textContent = timestamp(); });

  btnClear.addEventListener('click', clearFiles);
  btnRun.addEventListener('click', runPipeline);
  if (btnExport) btnExport.addEventListener('click', exportFiles);

  const inpDateFmt = $('#inp-date-fmt');
  const inpTimeFmt = $('#inp-time-fmt');
  const inpThreshold = $('#inp-threshold');
  if (inpDateFmt) inpDateFmt.addEventListener('input', resetProcessedState);
  if (inpTimeFmt) inpTimeFmt.addEventListener('input', resetProcessedState);
  if (inpThreshold) inpThreshold.addEventListener('input', resetProcessedState);
});
