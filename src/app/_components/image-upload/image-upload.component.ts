import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent implements OnInit {

  selectedImage: File | null = null;
  imageUrl!: string;
  images!: any[];
  displayImage!: string

  constructor(
    private storage: AngularFireStorage,
    private firestore: AngularFirestore
  ) { }

  ngOnInit(): void {
    this.firestore.collection('images').valueChanges().subscribe((data: any[]) => {
      this.images = data;
    });
  }

  onFileSelected(event: any) {
    this.selectedImage = event.target.files[0];
  }

  onUpload() {
    if (this.selectedImage) {
      const filePath = `images/${Date.now()}_${this.selectedImage.name}`;
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, this.selectedImage);
    
      task.snapshotChanges().subscribe(
        (snapshot) => {
          if (snapshot?.state === 'success') {
            fileRef.getDownloadURL().subscribe((downloadUrl) => {
              this.firestore.collection('images').add({downloadUrl});
              console.log('Image uploaded successfully!');
              this.imageUrl = downloadUrl;
            });
          }
        },
        (error) => {
          console.error('Image upload failed: ', error);
        }
      )
    }
  }

  onClick(imageUrl: string) {
    this.displayImage = imageUrl;
    console.log("Clicked image: ", imageUrl )
  }
}
