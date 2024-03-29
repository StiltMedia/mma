!function (a) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery", "../grid.base"], a) : a(jQuery)
}(function (a) {
    a.jgrid = a.jgrid || {}, a.jgrid.hasOwnProperty("regional") || (a.jgrid.regional = []), a.jgrid.regional.pt = {
        defaults: {
            recordtext: "View {0} - {1} of {2}",
            emptyrecords: "No records to view",
            loadtext: "A carregar...",
            pgtext: "Página {0} de {1}",
            savetext: "Saving...",
            pgfirst: "First Page",
            pglast: "Last Page",
            pgnext: "Next Page",
            pgprev: "Previous Page",
            pgrecs: "Records per Page",
            showhide: "Toggle Expand Collapse Grid",
            pagerCaption: "Grid::Page Settings",
            pageText: "Page:",
            recordPage: "Records per Page",
            nomorerecs: "No more records...",
            scrollPullup: "Pull up to load more...",
            scrollPulldown: "Pull down to refresh...",
            scrollRefresh: "Release to refresh..."
        },
        search: {
            caption: "Busca...",
            Find: "Procurar",
            Reset: "Limpar",
            odata: [{oper: "eq", text: "equal"}, {oper: "ne", text: "not equal"}, {
                oper: "lt",
                text: "less"
            }, {oper: "le", text: "less or equal"}, {oper: "gt", text: "greater"}, {
                oper: "ge",
                text: "greater or equal"
            }, {oper: "bw", text: "begins with"}, {oper: "bn", text: "does not begin with"}, {
                oper: "in",
                text: "is in"
            }, {oper: "ni", text: "is not in"}, {oper: "ew", text: "ends with"}, {
                oper: "en",
                text: "does not end with"
            }, {oper: "cn", text: "contains"}, {oper: "nc", text: "does not contain"}, {
                oper: "nu",
                text: "is null"
            }, {oper: "nn", text: "is not null"}],
            groupOps: [{op: "AND", text: "all"}, {op: "OR", text: "any"}],
            operandTitle: "Click to select search operation.",
            resetTitle: "Reset Search Value"
        },
        edit: {
            addCaption: "Adicionar Registo",
            editCaption: "Modificar Registo",
            bSubmit: "Submeter",
            bCancel: "Cancelar",
            bClose: "Fechar",
            saveData: "Data has been changed! Save changes?",
            bYes: "Yes",
            bNo: "No",
            bExit: "Cancel",
            msg: {
                required: "Campo obrigat�rio",
                number: "Por favor, introduza um numero",
                minValue: "O valor deve ser maior ou igual que",
                maxValue: "O valor deve ser menor ou igual a",
                email: "N�o � um endere�o de email v�lido",
                integer: "Por favor, introduza um numero inteiro",
                url: "is not a valid URL. Prefix required ('http://' or 'https://')",
                nodefined: " is not defined!",
                novalue: " return value is required!",
                customarray: "Custom function should return array!",
                customfcheck: "Custom function should be present in case of custom checking!"
            }
        },
        view: {caption: "View Record", bClose: "Close"},
        del: {
            caption: "Eliminar",
            msg: "Deseja eliminar o(s) registo(s) seleccionado(s)?",
            bSubmit: "Eliminar",
            bCancel: "Cancelar"
        },
        nav: {
            edittext: " ",
            edittitle: "Modificar registo seleccionado",
            addtext: " ",
            addtitle: "Adicionar novo registo",
            deltext: " ",
            deltitle: "Eliminar registo seleccionado",
            searchtext: " ",
            searchtitle: "Procurar",
            refreshtext: "",
            refreshtitle: "Actualizar",
            alertcap: "Aviso",
            alerttext: "Por favor, seleccione um registo",
            viewtext: "",
            viewtitle: "View selected row",
            savetext: "",
            savetitle: "Save row",
            canceltext: "",
            canceltitle: "Cancel row editing",
            selectcaption: "Actions..."
        },
        col: {caption: "Mostrar/Ocultar Colunas", bSubmit: "Enviar", bCancel: "Cancelar"},
        errors: {
            errcap: "Erro",
            nourl: "N�o especificou um url",
            norecords: "N�o existem dados para processar",
            model: "Tamanho do colNames <> colModel!"
        },
        formatter: {
            integer: {thousandsSeparator: " ", defaultValue: "0"},
            number: {decimalSeparator: ".", thousandsSeparator: " ", decimalPlaces: 2, defaultValue: "0.00"},
            currency: {
                decimalSeparator: ".",
                thousandsSeparator: " ",
                decimalPlaces: 2,
                prefix: "",
                suffix: "",
                defaultValue: "0.00"
            },
            date: {
                dayNames: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab", "Domingo", "Segunda-Feira", "Ter�a-Feira", "Quarta-Feira", "Quinta-Feira", "Sexta-Feira", "S�bado"],
                monthNames: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez", "Janeiro", "Fevereiro", "Mar�o", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
                AmPm: ["am", "pm", "AM", "PM"],
                S: function (a) {
                    return 11 > a || a > 13 ? ["�", "�", "�", "�"][Math.min((a - 1) % 10, 3)] : "�"
                },
                srcformat: "Y-m-d",
                newformat: "d/m/Y",
                parseRe: /[#%\\\/:_;.,\t\s-]/,
                masks: {
                    ISO8601Long: "Y-m-d H:i:s",
                    ISO8601Short: "Y-m-d",
                    ShortDate: "n/j/Y",
                    LongDate: "l, F d, Y",
                    FullDateTime: "l, F d, Y g:i:s A",
                    MonthDay: "F d",
                    ShortTime: "g:i A",
                    LongTime: "g:i:s A",
                    SortableDateTime: "Y-m-d\\TH:i:s",
                    UniversalSortableDateTime: "Y-m-d H:i:sO",
                    YearMonth: "F, Y"
                },
                reformatAfterEdit: !1,
                userLocalTime: !1
            },
            baseLinkUrl: "",
            showAction: "",
            target: "",
            checkbox: {disabled: !0},
            idName: "id"
        }
    }
});