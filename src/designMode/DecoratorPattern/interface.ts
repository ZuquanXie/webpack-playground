export interface Photo {
    name: string;
    [key: string]: any;
};

export interface PhotoWall {
    getPhotosCount: () => number;
    getContent: () => Photo[];
}

export interface PhotoWallPaster extends PhotoWall {
    photoWall: PhotoWall;
}