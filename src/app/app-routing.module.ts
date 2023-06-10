import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImageUploadComponent } from './_components/image-upload/image-upload.component';

const routes: Routes = [
  {path: '', redirectTo: 'imageUpload', pathMatch: 'full'},
  {path: 'imageUpload', component: ImageUploadComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
