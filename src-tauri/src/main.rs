// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

#[tauri::command]
fn save_file(filename: String, content: Vec<u8>) -> Result<String, String> {
    let file_path = rfd::FileDialog::new()
        .set_file_name(&filename)
        .add_filter("Excel Spreadsheet", &["xlsx"])
        .add_filter("CSV File", &["csv"])
        .save_file();

    if let Some(path) = file_path {
        std::fs::write(&path, content)
            .map_err(|e| format!("Failed to write file: {}", e))?;
        Ok(path.to_string_lossy().into_owned())
    } else {
        Err("Save cancelled".to_string())
    }
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![save_file])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}