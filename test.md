# Test technique Stack Overflow

## 1. Tests de l'API

## Test 1.1 : Appel sans paramètre obligatoire (test négatif)

| Aspect               | Détail                                             |
| -------------------- | -------------------------------------------------- |
| **Objectif**         | Vérifier la validation des paramètres obligatoires |
| **Requête**          | `GET https://api.stackexchange.com/2.3/questions`  |
| **Résultat attendu** | HTTP 400 Bad Request                               |
| **Résultat obtenu**  | HTTP 400 avec message "site parameter is required" |
| **Validation**       | L'API rejette correctement les requêtes mal formées |

## Test 1.2 : Appel valide basique

| Aspect               | Détail                                             |
| -------------------- | -------------------------------------------------- |
| **Objectif**         | Vérifier que l'API fonctionne avec le paramètre minimal requis |
| **Requête**          | ` https://api.stackexchange.com/2.3/questions?site=stackoverflow`  |
| **Résultat attendu** | Code HTTP 200 OK, réponse JSON valide                              |
| **Résultat obtenu**  | HTTP 200 OK  |
| **Structure vérifiée** | { "items": [...], "has_more": true, "quota_max": 300, "quota_remaining": 290 } |
| **Validation**       | L'API reette correctement les requêtes mal formées |
| **Observations**       |30 questions retournées par défaut (pagesize implicite = 30) |

## Test 1.3 : Test du paramètre pagesize (pagination)

| Aspect               | Détail                                             |
| -------------------- | -------------------------------------------------- |
| **Objectif**         | Vérifier que la limitation du nombre de résultats fonctionne|
| **Requête**          | `GET https://api.stackexchange.com/2.3/questions?site=stackoverflow&pagesize=5`  |
| **Résultat attendu** | Tableau items contenant exactement 5 questions                           |
| **Résultat obtenu**  | 5 questions dans items |
| **Structure vérifiée** |La longueur du tableau correspond à pagesize |
| **Validation**       | L'API reette correctement les requêtes mal formées |
| **Observations**       |30 questions retournées par défaut (pagesize implicite = 30) |

## Test 1.4 : Test du tri par date de création

| Aspect               | Détail                                             |
| -------------------- | -------------------------------------------------- |
| **Objectif**         | Vérifier que le tri chronologique fonctionne correctement|
| **Requête1**          | `GET https://api.stackexchange.com/2.3/questions?site=stackoverflow&pagesize=5`  |
| **Requête2**          | `https://api.stackexchange.com/2.3/questions?site=stackoverflow&sort=creation&order=asc&pagesize=1`  |
| **Résultat attendu** | La question la plus récente en desc, la plus ancienne en asc                          |
| **Résultat obtenu**  | Les dates (creation_date) sont dans l'ordre attendu |
| **Structure vérifiée** |La longueur du tableau correspond à pagesize |
| **Validation**       | L'API reette correctement les requêtes mal formées |
