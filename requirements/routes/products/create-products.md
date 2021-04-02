# Criar produto

> ## Caso de sucesso

1. ✅ Recebe uma requisição do tipo **POST** na rota **/api/products**
2. ✅ Valida dados obrigatórios **description** e **supplier_id**
3. ✅ **Cria** um produto com os dados fornecidos
4. ✅ Retorna **201**, com os produtos criados

> ## Exceções

1. ✅ Retorna erro **404** se a API não existir
2. ✅ Retorna erro **400** se description ou supplier_id não forem fornecidos pelo client
3. ✅ Retorna erro **500** se der erro ao tentar criar o produto