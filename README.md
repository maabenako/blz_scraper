# 💄 Scraper Beleza na Web

Este projeto é um **scraper de produtos** do site **Beleza na Web**, desenvolvido em **Node.js** com `cheerio` e `json2csv`. Ele coleta dados diretamente da vitrine do e-commerce via requisições à API pública usada no front-end da loja.

---

## 🚀 Funcionalidades

- Percorre diversas categorias do site (Maquiagem, Skincare, Cabelos, Perfumes, etc.)
- Paginação automática com limite de até 1000 páginas por categoria
- Extração de dados detalhados de cada produto
- Exportação dos dados em formato **CSV** pronto para análise
- Delay entre páginas e entre categorias para evitar bloqueios

---

## 📦 Dados Coletados

Para cada produto listado, o script coleta:

- `nome`: nome do produto  
- `preco_promocional` e `preco_original`  
- `link`: URL do produto  
- `descricao`: descrição curta  
- `nota_media`: avaliação média  
- `qtd_avaliacoes`: número de avaliações  
- `tag`: rótulo promocional (ex: lançamento, exclusivo)  
- `condicao`: texto de parcelamento  
- `percentual_desconto`: percentual de desconto (se houver)  
- `sku`: identificador do produto  
- `id_seller` e `nome_loja`: dados do vendedor  

---

## 🛠️ Tecnologias Utilizadas

- `Node.js`
- `cheerio`
- `axios` ou `node-fetch`
- `json2csv`
- `fs`

---

## 🧪 Como Usar

### 1. Clonar o repositório
```bash
git clone https://github.com/maabenako/belezaweb-scraper.git
cd belezaweb-scraper
```
### 2. Instalar dependências
```bash
npm install cheerio node-fetch json2csv
```
ou, se estiver usando axios no lugar de node-fetch:
```bash
npm install cheerio axios json2csv
```
###3. Executar o script
```bash
node beleza_scraper.js
```
---

### 📁 Saída
O resultado será salvo em um arquivo chamado:
kabum_products.csv

---

### 👩‍💻 Autora
Desenvolvido com 💙 por Marcela Nako
🔗 [in/marcelaabe-alvim/] | 💼 [https://github.com/maabenako?tab=repositories]

# English:

# 💄 Beleza na Web Scraper

This project is a **product scraper** for the Brazilian e-commerce site **Beleza na Web**, developed in **Node.js** using `cheerio` and `json2csv`. It collects data directly from the store's product showcase via public API requests used by the front-end.

---

## 🚀 Features

- Navigates through multiple product categories (Makeup, Skincare, Hair, Perfume, etc.)
- Automatic pagination with support for up to 1000 pages per category
- Detailed product data extraction
- Data exported to **CSV** for easy analysis
- Adds delay between pages and categories to avoid blocking

---

## 📦 Extracted Data

For each listed product, the script collects:

- `nome`: product name  
- `preco_promocional` and `preco_original`: current and original prices  
- `link`: product URL  
- `descricao`: short description  
- `nota_media`: average rating  
- `qtd_avaliacoes`: number of reviews  
- `tag`: promotional label (e.g. "new", "exclusive")  
- `condicao`: installment/payment condition text  
- `percentual_desconto`: discount percentage (if any)  
- `sku`: product identifier  
- `id_seller` and `nome_loja`: seller data  

---

## 🛠️ Technologies Used

- Node.js  
- cheerio  
- axios or node-fetch  
- json2csv  
- fs

---

## 🧪 How to Use

### 1. Clone the repository  
```bash
git clone https://github.com/maabenako/belezaweb-scraper.git  
cd belezaweb-scraper  
```
### 2. Install dependencies  
```bash 
npm install cheerio node-fetch json2csv  
```
Or, if you are using axios instead of node-fetch:  
```bash
npm install cheerio axios json2csv  
```
### 3. Run the script  
```bash
node beleza_scraper.js  
```
---

## 📁 Output

The result will be saved in a file named:  
```bash
kabum_products.csv  
```
---

## 👩‍💻 Author

Developed with 💙 by **Marcela Nako**  
🔗 [LinkedIn](https://www.linkedin.com/in/marcelaabe-alvim/)  
💼 [GitHub](https://github.com/maabenako?tab=repositories)

---

