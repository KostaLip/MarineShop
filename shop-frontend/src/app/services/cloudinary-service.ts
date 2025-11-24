import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CloudinaryService {
  private cloudName = 'dtv7wbjbh';
  private uploadPreset = 'category_icons';
  
  constructor(private http: HttpClient) {}

  uploadImage(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', this.uploadPreset);
    formData.append('folder', 'category-icons');

    return this.http.post(
      `https://api.cloudinary.com/v1_1/${this.cloudName}/image/upload`,
      formData
    );
  }

  deleteImage(publicId: string): Observable<any> {
    const formData = new FormData();
    formData.append('public_id', publicId);
    formData.append('upload_preset', this.uploadPreset);

    return this.http.post(
      `https://api.cloudinary.com/v1_1/${this.cloudName}/image/destroy`,
      formData
    );
  }
}
