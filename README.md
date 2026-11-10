# JOI Clone — AI Companions

Clone do estilo joi.com com suporte a 6 idiomas (PT, EN, ES, FR, DE, AR).

## Como rodar localmente

```bash
npm install
npm run dev
```

Abra: http://localhost:3000

## Deploy na Netlify (recomendado)

### Forma mais fácil (com GitHub)

1. Crie conta grátis em https://github.com
2. Crie um repositório novo chamado `joi-clone`
3. Suba este projeto para o GitHub
4. Entre em https://app.netlify.com e faça login (pode usar a conta do GitHub)
5. Clique em **Add new site** → **Import an existing project**
6. Escolha o GitHub e o repositório `joi-clone`
7. A Netlify detecta Next.js automaticamente
8. Clique em **Deploy site**

Pronto! Seu site fica no ar com URL tipo:  
`https://algo-aleatorio.netlify.app`

Você pode depois trocar o nome do site nas configurações.

## Idiomas disponíveis

- 🇧🇷 Português
- 🇺🇸 English
- 🇪🇸 Español
- 🇫🇷 Français
- 🇩🇪 Deutsch
- 🇸🇦 العربية (com suporte RTL)

## Próximos passos

- [ ] Conectar IA real no chat (OpenAI / Grok / Together)
- [ ] Login de usuários
- [ ] Banco de dados
- [ ] Geração de imagens com IA
