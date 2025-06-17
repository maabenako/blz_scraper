const cheerio = require('cheerio');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const { Parser } = require('json2csv');
const fs = require('fs');

const headers = {
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
  "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
  "Referer": "https://www.belezanaweb.com.br/",
  "Origin": "https://www.belezanaweb.com.br",
  "Connection": "keep-alive",
  "X-Requested-With": "XMLHttpRequest"
};

// Category metadata used to build requests
const categorias = [
  // (Categories omitted here for brevity, no need to translate variable data)
];

(async () => {
  try {
    const produtos = [];

    for (const categoria of categorias) {
      console.log(`🛍️ Starting capture: ${categoria.nomeCategoria}`);

      let pagina = 1;
      while (pagina <= 1000) {
        const params = new URLSearchParams({
          size: 36,
          pagina,
          uri: categoria.uri,
          permanentId: categoria.permanentId,
          pageName: categoria.pageName,
          fieldList:
            "gift,featured,imageObjects,compositionId,marketable.isMarketable,marketable.discontinued,inventory.quantity,advertisements,priceSpecification,sku,brand.name,brand.slugName,group.total,slugName,label,badge,hasGiftBenefits,organization,name,details.shortDescription,aggregateRating"
        });

        const url = `https://www.belezanaweb.com.br/api/htmls/showcase?${params}`;
        const res = await fetch(url, { headers });
        const html = await res.text();
        const $ = cheerio.load(html);

        const itensNaPagina = $(".showcase-item").length;
        if (itensNaPagina === 0) {
          console.log(`🚫 ${categoria.nomeCategoria} | Page ${pagina} has no products. Stopping.`);
          break;
        }

        $(".showcase-item").each((i, el) => {
          const nome = $(el).find(".showcase-item-title").text().trim();
          const preco_promocional = $(el).find(".price-value").text().trim().replace("R$", "").replace(",", ".");
          const preco_original = $(el).find(".item-price-max").text().trim().replace("R$", "").replace(",", ".");
          const link = $(el).find(".showcase-item-title").closest("a").attr("href");
          const descricao = $(el).find(".showcase-item-description").text().trim();
          const nota_media = $(el).find(".product-wish-list-heart").attr("data-aggregate-rating-value") || null;
          const qtd_avaliacoes = $(el).find(".product-wish-list-heart").attr("data-aggregate-rating-count") || null;
          const tag = $(el).find(".showcase-label-dynamic").text().trim() || null;

          // 💳 Installment information
          let condicao = null;
          const textoParcelamento = $(el).find(".item-price-installments").text().trim();
          if (textoParcelamento) condicao = textoParcelamento;

          // 🔻 Discount percentage
          let percentual_desconto = null;
          const descontoAttr = $(el).find(".item-discount").attr("data-discount");
          if (descontoAttr) {
            try {
              percentual_desconto = JSON.parse(descontoAttr)?.discount || null;
            } catch (e) {}
          }

          // 🔢 SKU from data-event attribute
          let sku = null;
          const dataEvent = $(el).attr("data-event");
          if (dataEvent) {
            try {
              sku = JSON.parse(dataEvent)?.sku || null;
            } catch (e) {}
          }

          // 🏪 Seller ID and store name
          let id_seller = null;
          let nome_loja = null;
          const skuDataAttr = $(el).find('a.js-add-to-cart[data-sku]').first().attr("data-sku");
          if (skuDataAttr) {
            try {
              const parsed = JSON.parse(skuDataAttr);
              if (Array.isArray(parsed) && parsed.length > 0) {
                const skuData = parsed[0];
                id_seller = skuData?.seller?.id || null;
                nome_loja = skuData?.seller?.name || null;
              }
            } catch (e) {}
          }

          produtos.push({
            uri: categoria.uri,
            pagina,
            nome,
            preco_promocional,
            preco_original,
            link: link?.startsWith("/") ? `https://www.belezanaweb.com.br${link}` : "",
            descricao,
            qtd_avaliacoes,
            nota_media,
            tag,
            sku,
            id_seller,
            nome_loja,
            condicao,
            percentual_desconto
          });
        });

        console.log(`✅ ${categoria.nomeCategoria} | Page ${pagina} captured`);
        pagina++;
      }
    }

    const parser = new Parser();
    const csv = parser.parse(produtos);
    fs.writeFileSync("produtos_beleza_completo.csv", csv);

    console.log("🎉 Final CSV successfully saved: produtos_beleza_completo.csv");
  } catch (e) {
    console.error("❌ Error during capture:", e);
  }
})();
