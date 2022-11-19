# Wildcards



A seguinte pesquisa

```sql
select data->>'name'
from people
where data->>'name' LIKE '%Alan%'
```

Sem indexes resulta no seguinte plano e execução:

```json
Plan:
[
  {
    "Plan": {
      "Node Type": "Gather",
      "Parallel Aware": false,
      "Async Capable": false,
      "Startup Cost": 1000.00,
      "Total Cost": 32573.40,
      "Plan Rows": 1456,
      "Plan Width": 32,
      "Actual Startup Time": 0.840,
      "Actual Total Time": 36.132,
      "Actual Rows": 90,
      "Actual Loops": 1,
      "Output": ["((data ->> 'name'::text))"],
      "Workers Planned": 2,
      "Workers Launched": 2,
      "Single Copy": false,
      "Shared Hit Blocks": 14057,
      "Shared Read Blocks": 16232,
      "Shared Dirtied Blocks": 0,
      "Shared Written Blocks": 0,
      "Local Hit Blocks": 0,
      "Local Read Blocks": 0,
      "Local Dirtied Blocks": 0,
      "Local Written Blocks": 0,
      "Temp Read Blocks": 0,
      "Temp Written Blocks": 0,
      "Plans": [
        {
          "Node Type": "Seq Scan",
          "Parent Relationship": "Outer",
          "Parallel Aware": true,
          "Async Capable": false,
          "Relation Name": "people",
          "Schema": "public",
          "Alias": "people",
          "Startup Cost": 0.00,
          "Total Cost": 31427.80,
          "Plan Rows": 607,
          "Plan Width": 32,
          "Actual Startup Time": 0.752,
          "Actual Total Time": 31.150,
          "Actual Rows": 30,
          "Actual Loops": 3,
          "Output": ["(data ->> 'name'::text)"],
          "Filter": "((people.data ->> 'name'::text) ~~ '%Alan%'::text)",
          "Rows Removed by Filter": 60625,
          "Shared Hit Blocks": 14057,
          "Shared Read Blocks": 16232,
          "Shared Dirtied Blocks": 0,
          "Shared Written Blocks": 0,
          "Local Hit Blocks": 0,
          "Local Read Blocks": 0,
          "Local Dirtied Blocks": 0,
          "Local Written Blocks": 0,
          "Temp Read Blocks": 0,
          "Temp Written Blocks": 0,
          "Workers": [
            {
              "Worker Number": 0,
              "Actual Startup Time": 0.757,
              "Actual Total Time": 30.161,
              "Actual Rows": 25,
              "Actual Loops": 1,
              "Shared Hit Blocks": 4061,
              "Shared Read Blocks": 5001,
              "Shared Dirtied Blocks": 0,
              "Shared Written Blocks": 0,
              "Local Hit Blocks": 0,
              "Local Read Blocks": 0,
              "Local Dirtied Blocks": 0,
              "Local Written Blocks": 0,
              "Temp Read Blocks": 0,
              "Temp Written Blocks": 0
            },
            {
              "Worker Number": 1,
              "Actual Startup Time": 0.843,
              "Actual Total Time": 30.143,
              "Actual Rows": 34,
              "Actual Loops": 1,
              "Shared Hit Blocks": 4537,
              "Shared Read Blocks": 4969,
              "Shared Dirtied Blocks": 0,
              "Shared Written Blocks": 0,
              "Local Hit Blocks": 0,
              "Local Read Blocks": 0,
              "Local Dirtied Blocks": 0,
              "Local Written Blocks": 0,
              "Temp Read Blocks": 0,
              "Temp Written Blocks": 0
            }
          ]
        }
      ]
    },
    "Settings": {
    },
    "Planning": {
      "Shared Hit Blocks": 0,
      "Shared Read Blocks": 0,
      "Shared Dirtied Blocks": 0,
      "Shared Written Blocks": 0,
      "Local Hit Blocks": 0,
      "Local Read Blocks": 0,
      "Local Dirtied Blocks": 0,
      "Local Written Blocks": 0,
      "Temp Read Blocks": 0,
      "Temp Written Blocks": 0
    },
    "Planning Time": 0.045,
    "Triggers": [
    ],
    "Execution Time": 36.153
  }
]
```

Já indexada, utilizando GIN com `gin_trgm_ops` (ver extension `pg_trgm`), obtemos o seguinte:

```json
[
  {
    "Plan": {
      "Node Type": "Bitmap Heap Scan",
      "Parallel Aware": false,
      "Async Capable": false,
      "Relation Name": "people",
      "Schema": "public",
      "Alias": "people",
      "Startup Cost": 31.28,
      "Total Cost": 4820.43,
      "Plan Rows": 1456,
      "Plan Width": 32,
      "Actual Startup Time": 0.165,
      "Actual Total Time": 0.292,
      "Actual Rows": 90,
      "Actual Loops": 1,
      "Output": ["(data ->> 'name'::text)"],
      "Recheck Cond": "((people.data ->> 'name'::text) ~~ '%Alan%'::text)",
      "Rows Removed by Index Recheck": 20,
      "Exact Heap Blocks": 110,
      "Lossy Heap Blocks": 0,
      "Shared Hit Blocks": 120,
      "Shared Read Blocks": 0,
      "Shared Dirtied Blocks": 0,
      "Shared Written Blocks": 0,
      "Local Hit Blocks": 0,
      "Local Read Blocks": 0,
      "Local Dirtied Blocks": 0,
      "Local Written Blocks": 0,
      "Temp Read Blocks": 0,
      "Temp Written Blocks": 0,
      "Plans": [
        {
          "Node Type": "Bitmap Index Scan",
          "Parent Relationship": "Outer",
          "Parallel Aware": false,
          "Async Capable": false,
          "Index Name": "people_data_name_trgm_idx",
          "Startup Cost": 0.0,
          "Total Cost": 30.92,
          "Plan Rows": 1456,
          "Plan Width": 0,
          "Actual Startup Time": 0.144,
          "Actual Total Time": 0.144,
          "Actual Rows": 110,
          "Actual Loops": 1,
          "Index Cond": "((people.data ->> 'name'::text) ~~ '%Alan%'::text)",
          "Shared Hit Blocks": 10,
          "Shared Read Blocks": 0,
          "Shared Dirtied Blocks": 0,
          "Shared Written Blocks": 0,
          "Local Hit Blocks": 0,
          "Local Read Blocks": 0,
          "Local Dirtied Blocks": 0,
          "Local Written Blocks": 0,
          "Temp Read Blocks": 0,
          "Temp Written Blocks": 0
        }
      ]
    },
    "Settings": {},
    "Planning": {
      "Shared Hit Blocks": 45,
      "Shared Read Blocks": 1,
      "Shared Dirtied Blocks": 0,
      "Shared Written Blocks": 0,
      "Local Hit Blocks": 0,
      "Local Read Blocks": 0,
      "Local Dirtied Blocks": 0,
      "Local Written Blocks": 0,
      "Temp Read Blocks": 0,
      "Temp Written Blocks": 0
    },
    "Planning Time": 0.289,
    "Triggers": [],
    "Execution Time": 0.332
  }
]
```

Uma melhoria de 99% em termos de recursos de tempo.

A mesma query no MongoDB ficaria:

```js
db.people.find({ name: /.*Alan.*/ });
```

E para essa query sem nenhum index, obtemos o seguinte execution plan

```json
{
  "stage": "COLLSCAN",
  "filter": {
    "name": {
      "$regex": ".*Alan.*"
    }
  },
  "nReturned": 90,
  "executionTimeMillisEstimate": 12,
  "works": 181967,
  "advanced": 90,
  "needTime": 181876,
  "needYield": 0,
  "saveState": 181,
  "restoreState": 181,
  "isEOF": 1,
  "direction": "forward",
  "docsExamined": 181965
}
```

Atentar que o `executionTimeMillisEstimate` nos trouxe um valor de 12 ms, mas o tempo real da query está sendo por volta de 100 ms.

Quando criamos o index b-tree padrão na coluna (asc ou desc, não importa), o que acontece é que a consulta fica ainda pior.
Ele passa a ter dois stages, um IXSCAN, para o índice criado, e outro para FETCH, para buscar efetivamente o documento do heap.

EXPLAIN IXSCAN:

```json
{
  "stage": "IXSCAN",
  "filter": {
    "name": {
      "$regex": ".*Alan.*"
    }
  },
  "nReturned": 90,
  "executionTimeMillisEstimate": 11,
  "works": 181966,
  "advanced": 90,
  "needTime": 181875,
  "needYield": 0,
  "saveState": 181,
  "restoreState": 181,
  "isEOF": 1,
  "keyPattern": {
    "name": 1
  },
  "indexName": "name_1",
  "isMultiKey": false,
  "multiKeyPaths": {
    "name": []
  },
  "isUnique": false,
  "isSparse": false,
  "isPartial": false,
  "indexVersion": 2,
  "direction": "forward",
  "indexBounds": {
    "name": ["[\"\", {})", "[/.*Alan.*/, /.*Alan.*/]"]
  },
  "keysExamined": 181965,
  "seeks": 1,
  "dupsTested": 0,
  "dupsDropped": 0
}
```

EXPLAIN FETCH:

```json
{
  "stage": "FETCH",
  "nReturned": 90,
  "executionTimeMillisEstimate": 12,
  "works": 181966,
  "advanced": 90,
  "needTime": 181875,
  "needYield": 0,
  "saveState": 181,
  "restoreState": 181,
  "isEOF": 1,
  "docsExamined": 90,
  "alreadyHasObj": 0
}
```

No total, a query passou para cerca de 110ms em média.

Por que isso aconteceu? Principalmente porque o index b-tree em nada ajuda nesse caso pois é uma comparação wildcard, ou regex,
E o Mongo não consegue usar bem qualquer tipo de regex para caminhar pelo índice. Soma-se isso ao overhead do FETCH, e a performance
fica pior. O mongo no entanto consegue usar muito bem prefixos, portanto, se fizermos a seguinte query:

```js
db.people.find({ name: /^Alan/ });
```

Com isso temos o seguinte explain:

EXPLAIN FETCH:

```json
{
  "stage": "FETCH",
  "nReturned": 90,
  "executionTimeMillisEstimate": 0,
  "works": 92,
  "advanced": 90,
  "needTime": 1,
  "needYield": 0,
  "saveState": 0,
  "restoreState": 0,
  "isEOF": 1,
  "docsExamined": 90,
  "alreadyHasObj": 0
}
```

EXPLAIN IXSCAN:

```json
{
  "stage": "IXSCAN",
  "nReturned": 90,
  "executionTimeMillisEstimate": 0,
  "works": 92,
  "advanced": 90,
  "needTime": 1,
  "needYield": 0,
  "saveState": 0,
  "restoreState": 0,
  "isEOF": 1,
  "keyPattern": {
    "name": 1
  },
  "indexName": "name_1",
  "isMultiKey": false,
  "multiKeyPaths": {
    "name": []
  },
  "isUnique": false,
  "isSparse": false,
  "isPartial": false,
  "indexVersion": 2,
  "direction": "forward",
  "indexBounds": {
    "name": ["[\"Alan\", \"Alao\")", "[/^Alan/, /^Alan/]"]
  },
  "keysExamined": 91,
  "seeks": 2,
  "dupsTested": 0,
  "dupsDropped": 0
}
```

E os resultados são impressionantes, com uma resposta abaixo de 1ms, como o Postgres.

A conclusão neste caso é que pesquisas REGEX-like, ou no caso do Postgres com wildcards, são eficientes em apenas alguns casos
no Mongo, já que existe essas limitações quanto ao formato da pesquisa para utilização do index. Então se é necessário fazer pesquisas
simples com wildcards, considerando case-insensitive, é mais interessante a utilização de postgres como base primária schemaless.

Alguém poderia sugerir a utilização de `mapReduce`s para transformar as colunas indexáveis em trigramas e, assim, indexá-las como
texto, para tentar emular o comportamento do Postgres `pg_trgm`. E faz sentido a sugestão, com certeza se Mongo já é minha base
primária, eu optaria por uma solução neste sentido, assim como acredito que seria indeal em muitos caso um pre-processamento parecido
para algumas indexações no Postgres

Fontes:
Bitmap Index Scan VS Bitmap Heap Scan: https://dba.stackexchange.com/questions/119386/understanding-bitmap-heap-scan-and-bitmap-index-scan
GIN index e gin_trgm_ops: https://medium.com/swlh/performance-optimisation-for-wildcards-search-in-postgres-trigram-index-80df0b1f49c7
MongoDB explain results: https://www.mongodb.com/docs/manual/reference/explain-results/
Indexação com regex: https://www.mongodb.com/docs/manual/reference/operator/query/regex/#index-use
postgres trigrams: https://www.postgresql.org/docs/current/pgtrgm.html
