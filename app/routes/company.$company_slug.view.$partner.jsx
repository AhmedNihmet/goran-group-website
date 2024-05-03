import {
  Link,
  json,
  redirect,
  useLoaderData,
  useNavigate,
} from "@remix-run/react";
import { useCallback, useEffect, useState } from "react";

import partnerProductViewStyles from "~/styles/pages/partner-product-view.css";

import Modal from "~/components/Modal";
import { buildUrl } from "~/api/config";
import View from "~/Icons/View";
import Download from "~/Icons/Download";
import { useTranslation } from "react-i18next";

/**
 * @returns {import("@remix-run/node").LinkDescriptor[]}
 */
export const links = () => [
  {
    rel: "stylesheet",
    href: partnerProductViewStyles,
  },
];

/**
 * @returns {import("@remix-run/node").MetaDescriptor[]}
 */
export const meta = () => {
  return [{ title: "Goran Group | Companies Partner Product Details" }];
};

/**
 * @type {import("react-router").LoaderFunction}
 */
export const loader = async ({ request, params }) => {
  const url = buildUrl(request, "/data/general.json");

  const res = await fetch(url);
  const { partner_products } = await res.json();

  const { partner } = params;
  const partnerProducts = partner_products.filter(
    (item) => item.slug === partner
  );

  if (partnerProducts.length === 0) return redirect("..");

  const [selectedProduct] = partnerProducts;

  return json(selectedProduct);
};

const CompaniesPartnerView = () => {
  const navigate = useNavigate();

  const loaderData = useLoaderData();

  const { t, i18n } = useTranslation();

  const [isModalClosing, setIsModalClosing] = useState(false);

  const closeModal = useCallback(() => {
    setIsModalClosing(true);
    setTimeout(() => {
      navigate("..", { preventScrollReset: true, replace: true });
    }, 650);
  }, [navigate]);

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27) closeModal();
    };
    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [navigate, closeModal]);

  return (
    <Modal isClosing={isModalClosing} onClose={closeModal}>
      <article className="partner-product-view">
        <div className="partner-product-view__container">
          {loaderData.products.map((product) => (
            <table dir="ltr" key={product.id} className="partner-product-view__table">
              <thead>
                <tr>
                  <td colSpan={3} style={{ textAlign: "center" }}>
                    {product.title[i18n.language]}
                  </td>
                </tr>
                <tr>
                  <td>{t("Model")}</td>
                  <td colSpan={2} style={{ textAlign: "center" }}>
                    {t("Actions")}
                  </td>
                </tr>
              </thead>

              <tbody>
                {product.models.map((model) => (
                  <tr key={model.src_location}>
                    <td width="100%" style={{ fontFamily: "openSans" }}>{model.label}</td>
                    <td className="partner-product-view__table-action-cell">
                      <Link target="_blank" rel="noreferrer" to={model.src_location}>
                        <span>{t("View")}</span>
                        <View width={22} height={22} />
                      </Link>
                    </td>
                    <td className="partner-product-view__table-action-cell">
                      <Link target="_blank" rel="noreferrer" to={model.src_location} download>
                        <span>{t("download_simplified")}</span>
                        <Download width={20} height={20} />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ))}
        </div>
      </article>
    </Modal>
  );
};

export default CompaniesPartnerView;
