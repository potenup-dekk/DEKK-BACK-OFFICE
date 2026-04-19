interface GetCardImageUrlParams {
  imageUrl?: string;
  cardImageUrl?: string;
}

const LOCAL_IMAGE_BASE_URL = "http://localhost:3000";
const LOCAL_FALLBACK_IMAGE_PATH = "/logo.png";

const getImageBaseUrl = () => {
  const bucketBaseUrl = process.env.NEXT_PUBLIC_BUCKET_URL;

  if (!bucketBaseUrl) {
    return LOCAL_IMAGE_BASE_URL;
  }

  const trimmedBucketBaseUrl = bucketBaseUrl.trim();

  if (!trimmedBucketBaseUrl) {
    return LOCAL_IMAGE_BASE_URL;
  }

  return trimmedBucketBaseUrl.endsWith("/")
    ? trimmedBucketBaseUrl.slice(0, -1)
    : trimmedBucketBaseUrl;
};

const normalizeCardImageUrl = (
  value: string | undefined,
  imageBaseUrl: string,
) => {
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

  return `${imageBaseUrl}${normalizedPath}`;
};

const getCardImageUrl = ({ imageUrl, cardImageUrl }: GetCardImageUrlParams) => {
  const imageBaseUrl = getImageBaseUrl();

  const normalizedImageUrl =
    normalizeCardImageUrl(imageUrl, imageBaseUrl) ??
    normalizeCardImageUrl(cardImageUrl, imageBaseUrl);

  if (normalizedImageUrl) {
    return normalizedImageUrl;
  }

  return `${LOCAL_IMAGE_BASE_URL}${LOCAL_FALLBACK_IMAGE_PATH}`;
};

export default getCardImageUrl;
