# Criar fornecedor

> ## Caso de sucesso

1. ✅ Recebe uma requisição do tipo **POST** na rota **/api/suppliers**
2. ✅ Valida dados obrigatórios **name** e **country**
3. ✅ **Cria** um fornecedor com os dados fornecidos
4. ✅ Retorna **201**, com os suppliers criados

> ## Exceções

1. ✅ Retorna erro **404** se a API não existir
2. ✅ Retorna erro **400** se **name** ou **country** não forem fornecidos pelo client
3. ✅ Retorna erro **500** se der erro ao tentar criar o fornecedor