const libs = `${process.cwd()}/libs`;

const log = require(`${libs}/log`)(module);

const _ = require('lodash');

function parseWhereValue(type, value) {
    if(type === 'integer') return parseInt(value, 10);
    if(type === 'double') return parseFloat(value);
    if(type === 'string') return '%'+value+'%';
    if(type === 'boolean') {
        if(value === null || typeof value === 'boolean') {
            return value;
        }
        if(typeof value === 'string') {
            if(value.toLowerCase() === 'true' || value.toLowerCase() === '1') {
                return true;
            }
            if(value.toLowerCase() === 'null') {
                return null;
            }
        }
        return false;
    }
}

class ReqQueryFields {
    constructor(fields = {}, fieldValues = {}) {
        // Exemplo de requisição: `/api/v1/enrollments?dims=state,region,location`

        // Parâmetros no campo query da requisição.
        // Exemplo de field:
        // ```js
        // {
        //    name: 'dims',
        //    field: true,
        //    where: false
        // }
        // ```
        // Array de valores aceitos pelo campo.
        // Exemplo de valor:
        // ```
        // {
        //     name: 'location',
        //     table: 'localizacao',
        //     tableField: 'descricao'
        //     resultField: 'location_name',
        //     where: {
        //         relation: '=',
        //         type: 'integer',
        //         field: 'id_localizacao',
        //         table: 'turma'
        //     },
        //     join: {
        //         primary: 'pk_localizacao_id',
        //         foreign: 'id_localizacao',
        //         foreignTable: 'turma'
        //     }
        // }
        // ```
        this.fields = fields;
        this.fieldValues = fieldValues;
    }

    addField(field) {
        // Parâmetro no campo query da requisição.
        // Exemplo de field:
        // ```
        // {
        //    name: 'dims',
        //    field: true,
        //    where: false,
        //    fieldValues: {}
        // }
        // ```
        if(typeof this.fields[field.name] === 'undefined') {
            log.debug("added field "+field.name);
            this.fields[field.name] = field;
        }
        return this;
    }

    addValue(fieldValue) {
        // Valor aceito por **todos** os campos.
        // Exemplo de valor:
        // ```
        // {
        //     name: 'location',
        //     table: 'localizacao',
        //     tableField: 'descricao'
        //     resultField: 'location_name',
        //     where: {
        //         relation: '=',
        //         type: 'integer',
        //         field: 'id_localizacao',
        //         table: 'turma'
        //     },
        //     join: {
        //         primary: 'pk_localizacao_id',
        //         foreign: 'id_localizacao',
        //         foreignTable: 'turma'
        //     }
        // }
        // ```
        if(typeof this.fieldValues[fieldValue.name] === 'undefined') {
            this.fieldValues[fieldValue.name] = fieldValue;
            log.debug("added value "+fieldValue.name);
        }
        return this;
    }

    addValueToField(fieldValue, field) {
        // Valor aceito **apenas** pelo campo `field`.
        if(typeof this.fields[field] === 'undefined') {
            // Se o campo não existe, lança uma exception
            throw 'No field with name ' +field+ ' defined';
        }
        if(typeof this.fields[field].values === 'undefined') {
            this.fields[field].values = {};
        }
        if(typeof this.fields[field].values[fieldValue.name] === 'undefined') {
            this.fields[field].values[fieldValue.name] = fieldValue;
            log.debug("added value "+fieldValue.name+ ' to field ' + field);
        }
        return this;
    }

    parse() {
        // Faz o parse dos valores que vem na requisição para objetos.
        return (req, res, next) => {
            // "Foreach" nos campos aceitos
            Object.keys(this.fields).map((key, index) => {
                let params = [];
                // f é o campo
                let f = this.fields[key];
                // Unimos os valores parametros globalmente com os aceitos apenas pelo campo
                let values = _.merge(this.fieldValues, f.values);
                // Fazemos um foreach nos parametros aceitos
                Object.keys(values).map((k, i) => {
                    let value = values[k];
                    // Pushamos o parametro
                    params.push(value.name);
                });
                let queryField = f.name;
                let arrayOfParams = params;
                // Criamos o atributo com o nome do **campo** no objeto `req` (nome do campo é 'filter', 'dims', 'search', etc)
                req[queryField] = {};
                if (req.query[queryField]) {
                    // Se há mais de um parametro no campo, eles estão separados por vírgula.
                    // Fazemos o split então para separar os valores
                    const regex = /,(?=[a-z])/; // Pega as vírgulas que não estão nos atributos multivalorados
                    const params = req.query[queryField].split(regex);
                    // Objeto temporário para guardar os parametros e seus valores.
                    const obj = {};
                    for (const param of params) {
                        // O parametro *pode* ter um valor (por exemplo: `state:41`).
                        // Fazemos o split e temos um array `['state', 41]`
                        const kv = param.split(':');
                        // Checa se há um valor. Se não tem, definimos como true.
                        if ( (typeof kv[1] === 'undefined')) {
                            obj[kv[0]] = true;
                        } else {
                            try {
                                obj[kv[0]] = JSON.parse(kv[1]);
                            } catch(err) {
                                obj[kv[0]] = kv[1];
                            }
                        }
                        // `obj` é agora `{kv[0]: kv[1]}` ou `{kv[0]: true}`.
                        // No exemplo `{'state': 41}`
                    }

                    // Se o array existe e não está vazio fazemos a interseção
                    if (typeof arrayOfParams !== 'undefined' && arrayOfParams.length > 0) {
                        // Fazemos a interseção das chaves de `obj` com o array `arrayOfParams`.
                        // O array resultante são as chaves aceitas pelo campo.
                        const intersection = _.intersection(arrayOfParams, Object.keys(obj));
                        // Isso é um pouco complicado...
                        // Para cada chave na interseção pegamos seu valor em `obj`
                        // e atribuímos para o atributo que definimos no objeto `req`.
                        // Por exemplo: intersection = `['state']` então
                        // `obj[intersection[i]]` (com i=0) é `obj['state']`, cujo valor é 41.
                        // Então fazemos `req[queryField]['state'] = 41`
                        for (let i = 0; i < intersection.length; ++i) {
                            req[queryField][intersection[i]] = obj[intersection[i]];
                        }
                        req[queryField].size = intersection.length;
                    } else {
                        req[queryField] = obj;
                        req[queryField].size = Object.keys(obj).length;
                    }
                }
            });
            next();
        };
    }

    build() {
        // "Constrói" o SQL
        return (req, res, next) => {
            // Foreach no campos
            let hasJoined = {};
            let thisTable = req.sql.tableFrom;
            Object.keys(this.fields).forEach((key) => {
                // Campo
                let field = this.fields[key];
                log.debug(field);
                // `param` aqui é o atributo no objeto `req` (dims, filter, search, ...)
                let param = req[field.name];
                // Fazemos um foreach nos parametros dentro do atributo
                Object.keys(param).forEach((k) => {
                    let values = _.merge(this.fieldValues, field.values);
                    if(typeof values[k] !== 'undefined') {
                        // Clonamos para não alterar o original
                        let value = _.clone(values[k]);
                        if(value.parseOnly) return;
                        // Checa se não fizemos o join para este valor e se é necessário fazer
                        if(!hasJoined[value.table] && typeof value.join !== 'undefined') {
                            let foreignTable = '';
                            if(value.join.foreignTable) foreignTable = value.join.foreignTable+'.';
                            if(value.join.foreignTable === '@') foreignTable = thisTable+'.';
                            // Fazemos o join
                            let onClause = '';
                            if(Array.isArray(value.join.primary)) {
                                // Se é um array, montamos a cláusula ON com mais de uma coluna
                                value.join.primary.forEach((column, index, arr) => {
                                    onClause += foreignTable+value.join.foreign[index]+'='+value.table+'.'+column;
                                    if(index < arr.length-1) {
                                        onClause+=' AND ';
                                    }
                                });
                            } else {
                                onClause = foreignTable+value.join.foreign+'='+value.table+'.'+value.join.primary;
                            }
                            req.sql.join(value.table, null, onClause);
                            // Marcamos o join como feito para não ter problemas
                            hasJoined[value.table] = true;
                        }
                        // Se o valor é um campo a ser incluído no SELECT
                        if(typeof field.field !== 'undefined' && field.field) {
                            log.debug('SELECT');
                            let table = value.table;
                            if(table === '@') table = thisTable;
                            if (Array.isArray(value.resultField)) {
                                value.tableField.forEach((f, i) => {
                                    req.sql.field(table+'.'+f, value.resultField[i] || f)
                                        .group(table+'.'+f)
                                        .order(table+'.'+f);
                                })
                            }else{
                                req.sql.field(table+'.'+value.tableField, value.resultField || value.tableField)
                                    .order(table+'.'+value.tableField)
                                    .group(table+'.'+value.tableField);
                            }
                        }
                        // Se o valor é um campo para ser usado no WHERE
                        if(typeof field.where !== 'undefined' && field.where) {
                            log.debug('WHERE');
                            // Valor do where

                            let whereValue = param[k];
                            log.debug('whereValue');
                            log.debug(whereValue);
                            log.debug(`Where value é array? ${Array.isArray(whereValue)}`);

                            let tbl = value.where.table || value.table;
                            if (tbl === '@') tbl = thisTable;
                            // multiple where, only tested for  boolean filds
                            if (Array.isArray(value.tableField)) {
                                let lower = (value.where.type === 'string') ? ' LOWER(?) ' : ' ? ';
                                let whereField = '';
                                let whereValues = [];
                                value.where.field.forEach((f, i, arr) => {
                                    whereField += (value.where.type === 'string') ? 'LOWER(' + tbl + '.' + value.where.field[i] + ')' : tbl + '.' + value.where.field[i];
                                    whereField += ' ' + value.where.relation + ' ?';
                                    if (i < arr.length - 1) {
                                        whereField += ' ' + value.where.condition + ' ';
                                    }

                                    if (Array.isArray(whereValue)) {
                                        let whereString = '(';
                                        for(let i = 0; i < whereValue.length; ++i) {
                                            whereString += whereField;
                                            whereValues.push(parseWhereValue(value.where.type, whereValue[i]));
                                            if(i < whereValue.length-1) {
                                                whereString += ' OR ';
                                            }
                                        }
                                        whereString += ')';
                                    } else {
                                        whereValues.push(parseWhereValue(value.where.type, whereValue));
                                    }
                                });

                                req.sql.where(whereField, ...whereValues);
                            } else {
                                let whereField = (value.where.type === 'string') ? 'LOWER(' + tbl + '.' + value.where.field + ')' : tbl + '.' + value.where.field;
                                let lower = (value.where.type === 'string') ? ' LOWER(?) ' : ' ? ';
                                if(Array.isArray(whereValue)) {
                                    let whereString = '(';
                                    let arrayWhereValues = [];
                                    for(let i = 0; i < whereValue.length; ++i) {
                                        whereString += whereField + ' ' + value.where.relation + lower;
                                        arrayWhereValues.push(parseWhereValue(value.where.type, whereValue[i]));
                                        if(i < whereValue.length-1) {
                                            whereString += ' OR ';
                                        }
                                    }
                                    whereString += ')';
                                    req.sql.where(whereString, ...arrayWhereValues);
                                } else {
                                    req.sql.where(whereField + ' ' + value.where.relation + lower, parseWhereValue(value.where.type, whereValue));
                                }
                            }
                        }
                    }
                });
            });
            next();
        };
    }
}

module.exports = ReqQueryFields;
