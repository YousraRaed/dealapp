import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StorageMap } from '@ngx-pwa/local-storage';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { syncData } from 'src/app/store/actions/sync.action';

@Component({
  selector: 'app-offline-form',
  templateUrl: './offline-form.component.html',
  styleUrls: ['./offline-form.component.scss'],
})
export class OfflineFormComponent implements OnInit {
  form: FormGroup;
  imageUrl?: string;
  audioUrl?: SafeUrl;
  mediaRecorder?: MediaRecorder;
  audioChunks: Blob[] = [];
  recording: boolean = false;
  file?: File;

  constructor(
    private fb: FormBuilder,
    private storage: StorageMap,
    private sanitizer: DomSanitizer,
    private store: Store
  ) {
    this.form = this.fb.group({
      textInput: ['', [Validators.required, Validators.maxLength(10)]],
      imageInput: [null, Validators.required],
    });
  }

  ngOnInit() {}

  onImageChange(event: any) {
    const file = event.target.files[0];
    const imageInputControl = this.form.get('imageInput');

    if (imageInputControl) {
      imageInputControl.markAsDirty();
      imageInputControl.markAsTouched();

      if (file) {
        this.file = file;

        const fileValidationError = this.imageValidator(file);
        if (fileValidationError) {
          alert(
            'Invalid image. Ensure the file is an image and meets size requirements.'
          );
          imageInputControl.setErrors(fileValidationError);
          this.imageUrl = undefined;

          return;
        }

        this.validateImageDimensions(file).then((isValid) => {
          if (!isValid) {
            alert(
              'Invalid image dimensions. Ensure the image meets dimension requirements.'
            );
            imageInputControl.setErrors({ invalidDimensions: true });
            this.imageUrl = undefined;
          } else {
            const reader = new FileReader();
            reader.onload = () => {
              this.imageUrl = reader.result as string;
              imageInputControl.setErrors(null);
            };
            reader.readAsDataURL(file);
          }
        });
      }
    }
  }

  imageValidator(file: File): { [key: string]: boolean } | null {
    const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
    const maxSizeInMB = 5;

    if (!validTypes.includes(file.type)) {
      return { invalidType: true };
    }

    if (file.size > maxSizeInMB * 1024 * 1024) {
      return { invalidSize: true };
    }

    return null;
  }

  validateImageDimensions(file: File): Promise<boolean> {
    const maxWidth = 1920;
    const maxHeight = 1080;

    return new Promise<boolean>((resolve) => {
      const img = new Image();
      img.onload = () => {
        if (img.width > maxWidth || img.height > maxHeight) {
          resolve(false);
        } else {
          resolve(true);
        }
      };
      img.onerror = () => resolve(false);
      img.src = URL.createObjectURL(file);
    });
  }

  startRecording() {
    this.audioChunks = [];
    this.recording = true;
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        this.mediaRecorder = new MediaRecorder(stream);
        this.mediaRecorder.start();

        this.mediaRecorder.addEventListener('dataavailable', (event) => {
          this.audioChunks.push(event.data);
        });

        this.mediaRecorder.addEventListener('stop', () => {
          const audioBlob = new Blob(this.audioChunks, {
            type: 'audio/webm; codecs=opus',
          });
          console.log('Audio Blob: ', audioBlob);
          const audioUrl = URL.createObjectURL(audioBlob);
          this.audioUrl = this.sanitizer.bypassSecurityTrustUrl(audioUrl);
          this.recording = false;
        });
      })
      .catch((error) => {
        this.recording = false;
      });
  }

  stopRecording() {
    if (this.mediaRecorder) {
      this.mediaRecorder.stop();
    }
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    const textInputControl = this.form.get('textInput');
    const imageInputControl = this.form.get('imageInput');

    if (!textInputControl || !imageInputControl) {
      return;
    }

    const formData = {
      textInput: textInputControl.value,
      imageUrl: this.imageUrl,
      audioUrl: this.audioUrl,
    };

    this.storage.set('formData', formData).subscribe(() => {
      if (navigator.onLine) {
        this.store.dispatch(syncData());
      } else {
        alert('Form data saved locally. Will sync when online.');
      }
    });
  }

  get textInput() {
    return this.form.get('textInput');
  }

  get imageInput() {
    return this.form.get('imageInput');
  }
}
