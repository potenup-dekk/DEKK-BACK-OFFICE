import Image from "next/image";

import type { ProductProps } from "@/widgets/admin-card-review/model/props.type";
import { productStyle } from "@/widgets/admin-card-review/style";
import ActionButton from "@/shared/ui/Button/ActionButton";
import Link from "next/link";

const Product = ({
  brand,
  name,
  productImageUrl,
  productUrl,
  fallbackImageUrl,
}: ProductProps) => {
  const slots = productStyle();
  const productImageSource = productImageUrl || fallbackImageUrl;

  return (
    <article className={slots.root()}>
      <Image
        alt={`${brand}-${name}`}
        className={slots.image()}
        width="40"
        height="40"
        src={productImageSource}
        unoptimized
      />

      <div className={slots.content()}>
        <p className={slots.brand()}>{brand}</p>
        <p className={slots.name()}>{name}</p>
      </div>

      <Link href={productUrl} target="_blank">
        <ActionButton label="상품 보기" size="sm" />
      </Link>
    </article>
  );
};

export default Product;
