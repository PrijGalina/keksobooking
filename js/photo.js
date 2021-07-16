const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const avatarLoadingField = document.querySelector('#avatar');
const avatarOutputField = document.querySelector('.ad-form-header__avatar');
const flatLoadingField = document.querySelector('#images');
const flatOutputField = document.querySelector('.ad-form__photo-img');

const loadingDisplayingPhotos = (load, output) => {
  load.addEventListener('change', () => {
    const file = load.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

    if (matches) {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        output.src = reader.result;
      });
      reader.readAsDataURL(file);
    }
  });
};


loadingDisplayingPhotos(avatarLoadingField, avatarOutputField);
loadingDisplayingPhotos(flatLoadingField, flatOutputField);
