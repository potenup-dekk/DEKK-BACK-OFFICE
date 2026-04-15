interface GetCardImageUrlParams {
  cardId: number;
  imageUrl?: string;
  cardImageUrl?: string;
}

const normalizeCardImageUrl = (value?: string) => {
  if (!value) {
    return null;
  }

  const trimmedValue = value.trim();

  if (!trimmedValue) {
    return null;
  }

  if (
    trimmedValue.startsWith("http://") ||
    trimmedValue.startsWith("https://")
  ) {
    return trimmedValue;
  }

  if (trimmedValue.startsWith("//")) {
    return `https:${trimmedValue}`;
  }

  const normalizedPath = trimmedValue.startsWith("/")
    ? trimmedValue
    : `/${trimmedValue}`;

  return `${process.env.NEXT_PUBLIC_BUCKET_URL}${normalizedPath}`;
};

const getCardImageUrl = ({
  cardId,
  imageUrl,
  cardImageUrl,
}: GetCardImageUrlParams) => {
  const normalizedImageUrl =
    normalizeCardImageUrl(imageUrl) ?? normalizeCardImageUrl(cardImageUrl);

  if (normalizedImageUrl) {
    return normalizedImageUrl;
  }

  return `https://picsum.photos/seed/dekk-card-${cardId}/600/900`;
};

export default getCardImageUrl;
