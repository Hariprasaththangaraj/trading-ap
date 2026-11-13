
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders
} from '@angular/common/http';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-contract-master',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contract-master.html',
  styleUrls: ['./contract-master.css']
})
export class ContractMaster {

  selectedFile: File | null = null;

  isUploading = false;

  errorMessage = '';
  successMessage = '';
  uploadError = '';

  private readonly maxFileSize = 50 * 1024 * 1024;

  // Spring Boot upload API
  private readonly uploadUrl =
    'http://localhost:8080/contractmaster/upload';

  private readonly allowedExtensions = ['json'];

  constructor(
    private readonly http: HttpClient
  ) {}

  // Select and validate JSON file
  onFileSelected(event: Event): void {

    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    this.errorMessage = '';
    this.successMessage = '';
    this.uploadError = '';

    if (!file) {
      this.selectedFile = null;
      return;
    }

    // Validate extension
    const extension =
      file.name.split('.').pop()?.toLowerCase();

    if (
      !extension ||
      !this.allowedExtensions.includes(extension)
    ) {
      this.selectedFile = null;
      input.value = '';

      this.errorMessage =
        'Invalid file format. Please select a JSON file.';

      return;
    }

    // Validate empty file
    if (file.size === 0) {
      this.selectedFile = null;
      input.value = '';

      this.errorMessage =
        'The selected file is empty.';

      return;
    }

    // Validate maximum size: 50 MB
    if (file.size > this.maxFileSize) {
      this.selectedFile = null;
      input.value = '';

      this.errorMessage =
        'File size must not exceed 50 MB.';

      return;
    }

    this.selectedFile = file;

    console.log(
      'Selected JSON file:',
      file.name,
      'Size:',
      file.size,
      'bytes'
    );
  }

  // Remove selected file
  clearFile(input: HTMLInputElement): void {

    if (this.isUploading) {
      return;
    }

    this.selectedFile = null;
    input.value = '';

    this.errorMessage = '';
    this.successMessage = '';
    this.uploadError = '';
  }

  // Upload JSON file with JWT authentication
uploadFile(): void {
  console.log('UPLOAD BUTTON CLICKED');

  if (this.isUploading || !this.selectedFile) {
    console.error('Upload stopped: no file selected or upload in progress.');
    return;
  }

  const token = localStorage.getItem('token');

  console.log('Token exists:', !!token);
  console.log('Selected file:', this.selectedFile.name);

  if (!token) {
    this.errorMessage = 'Authentication token not found. Please log in again.';
    return;
  }

  const formData = new FormData();
  formData.append('file', this.selectedFile);

  const headers = new HttpHeaders({
    Accept: 'application/json, text/plain, */*',
    Authorization: `Bearer ${token}`
  });

  this.isUploading = true;

  console.log('Sending POST request:', this.uploadUrl);

  this.http.post<{ message?: string }>(
    this.uploadUrl,
    formData,
    { headers }
  )
  .pipe(
    finalize(() => {
      this.isUploading = false;
    })
  )
  .subscribe({
    next: (response) => {
      console.log('Upload successful:', response);
      this.successMessage =
        response?.message || 'JSON file uploaded successfully.';
      this.selectedFile = null;
    },
    error: (error: HttpErrorResponse) => {
      console.error('Upload failed:', error.status, error.error);

      this.uploadError =
        error.error?.message ||
        error.message ||
        `Upload failed with status ${error.status}.`;
    }
  });
}
  
}
