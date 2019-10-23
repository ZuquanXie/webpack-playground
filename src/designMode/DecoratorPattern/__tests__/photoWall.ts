import {Background, PhotoPaster} from '../classes';

test('photo-wall', () => {
    const background = new Background();
    let photoWall = background;
    const xiaoMin = {name: 'XiaoMin'};
    const xiaoLi = {name: 'XiaoLi'};

    expect(photoWall.getContent()).toEqual([]);
    expect(photoWall.getPhotosCount()).toBe(0);

    photoWall = new PhotoPaster(photoWall, xiaoMin);
    expect(photoWall.getContent()).toEqual([xiaoMin]);
    expect(photoWall.getPhotosCount()).toBe(1);

    photoWall = new PhotoPaster(photoWall, xiaoLi);
    expect(photoWall.getContent()).toEqual([xiaoMin, xiaoLi]);
    expect(photoWall.getPhotosCount()).toBe(2);
});