export const boarsNumberEnumToText = (value) => {
  switch (value) {
    case 'ONE':
      return 'Jeden';
    case 'TWO_TO_SEVEN':
      return 'Od 2 do 7';
    case 'EITGHT_TO_THIRTY':
      return 'Od 8 do 30';
    case 'ABOVE_THIRTY':
      return 'Więcej niż 30';
    default:
      return 'Liczba nieznana';
  }
}
