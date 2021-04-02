# Criar Order

> ## Caso de sucesso

1. ✅ Recebe uma requisição do tipo **POST** na rota **/api/orders**
2. ✅ Valida dados obrigatórios **product_id** e **price**
3. ✅ **Cria** uma purchase_order com os dados fornecidos
4. ✅ Retorna **201**, com as purchase orders criadas

> ## Exceções

1. ✅ Retorna erro **404** se a API não existir
2. ✅ Retorna erro **400** se price ou product_id não forem fornecidos pelo client
3. ✅ Retorna erro **500** se der erro ao tentar criar o produto