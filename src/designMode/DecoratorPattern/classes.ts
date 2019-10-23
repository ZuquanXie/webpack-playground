import {PhotoWall, PhotoWallPaster, Photo} from './interface';

export class Background implements PhotoWall {
    getPhotosCount() {
        return 0;
    }

    getContent() {
        return [];
    }
}

export class PhotoPaster implements PhotoWallPaster {
    constructor(photoWall: PhotoWall, photo: Photo) {
        this.photoWall = photoWall;
        this.photo = photo;
    }

    photoWall: Background;

    photo: Photo;

    getPhotosCount() {
        return this.photoWall.getPhotosCount() + 1;
    }

    getContent() {
        return [...this.photoWall.getContent(), this.photo];
    }
}