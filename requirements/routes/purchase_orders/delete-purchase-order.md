# Deletar Order

> ## Caso de sucesso

1. ✅ Recebe uma requisição do tipo **DELETE** na rota **/api/orders/:id**
2. ✅ Valida dado obrigatório **id**
3. ✅ **Faz o UPDATE** do campo **deletion_flag para 1**
4. ✅ Retorna **202**, sem dados

> ## Exceções

1. ✅ Retorna erro **404** se a API não existir
2. ✅ Retorna erro **400** se price ou product_id não forem fornecidos pelo client
3. ✅ Retorna erro **500** se der erro ao tentar criar o produto