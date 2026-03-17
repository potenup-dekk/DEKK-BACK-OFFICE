interface GetCardImageUrlParams {
  cardId: number;
  imageUrl?: string;
  cardImageUrl?: string;
}

const TRANSPARENT_GIF_DATA_URL =
  "data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA=";
const CARD_IMAGE_BASE_URL =
  "https://dekk-crawling-bucket.s3.ap-northeast-2.amazonaws.com";

const isMockCardImageEnabled = () => {
  return process.env.NEXT_PUBLIC_USE_MOCK_CARD_IMAGE !== "false";
};

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

  return `${CARD_IMAGE_BASE_URL}${normalizedPath}`;
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

  if (!isMockCardImageEnabled()) {
    return TRANSPARENT_GIF_DATA_URL;
  }

  return `https://picsum.photos/seed/dekk-card-${cardId}/600/900`;
};

export default getCardImageUrl;
