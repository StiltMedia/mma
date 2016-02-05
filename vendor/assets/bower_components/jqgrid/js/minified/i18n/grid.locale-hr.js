!function (a) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery", "../grid.base"], a) : a(jQuery)
}(function (a) {
    a.jgrid = a.jgrid || {}, a.jgrid.hasOwnProperty("regional") || (a.jgrid.regional = []), a.jgrid.regional.hr = {
        defaults: {
            recordtext: "Pregled {0} - {1} od {2}",
            emptyrecords: "Nema zapisa",
            loadtext: "Učitavam...",
            pgtext: "Stranica {0} od {1}",
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
            caption: "Traži...",
            Find: "Pretraživanje",
            Reset: "Poništi",
            odata: [{oper: "eq", text: "jednak"}, {oper: "ne", text: "nije identičan"}, {
                oper: "lt",
                text: "manje"
            }, {oper: "le", text: "manje ili identično"}, {oper: "gt", text: "veće"}, {
                oper: "ge",
                text: "veće ili identično"
            }, {oper: "bw", text: "počinje sa"}, {oper: "bn", text: "ne počinje sa "}, {
                oper: "in",
                text: "je u"
            }, {oper: "ni", text: "nije u"}, {oper: "ew", text: "završava sa"}, {
                oper: "en",
                text: "ne završava sa"
            }, {oper: "cn", text: "sadrži"}, {oper: "nc", text: "ne sadrži"}, {
                oper: "nu",
                text: "is null"
            }, {oper: "nn", text: "is not null"}],
            groupOps: [{op: "I", text: "sve"}, {op: "ILI", text: "bilo koji"}],
            operandTitle: "Click to select search operation.",
            resetTitle: "Reset Search Value"
        },
        edit: {
            addCaption: "Dodaj zapis",
            editCaption: "Promijeni zapis",
            bSubmit: "Preuzmi",
            bCancel: "Odustani",
            bClose: "Zatvri",
            saveData: "Podaci su promijenjeni! Preuzmi promijene?",
            bYes: "Da",
            bNo: "Ne",
            bExit: "Odustani",
            msg: {
                required: "Polje je obavezno",
                number: "Molim, unesite ispravan broj",
                minValue: "Vrijednost mora biti veća ili identična ",
                maxValue: "Vrijednost mora biti manja ili identična",
                email: "neispravan e-mail",
                integer: "Molim, unjeti ispravan cijeli broj (integer)",
                date: "Molim, unjeti ispravan datum ",
                url: "neispravan URL. Prefiks je obavezan ('http://' or 'https://')",
                nodefined: " nije definiran!",
                novalue: " zahtjevan podatak je obavezan!",
                customarray: "Opcionalna funkcija trebala bi bili polje (array)!",
                customfcheck: "Custom function should be present in case of custom checking!"
            }
        },
        view: {caption: "Otvori zapis", bClose: "Zatvori"},
        del: {caption: "Obriši", msg: "Obriši označen zapis ili više njih?", bSubmit: "Obriši", bCancel: "Odustani"},
        nav: {
            edittext: "",
            edittitle: "Promijeni obilježeni red",
            addtext: "",
            addtitle: "Dodaj novi red",
            deltext: "",
            deltitle: "Obriši obilježeni red",
            searchtext: "",
            searchtitle: "Potraži zapise",
            refreshtext: "",
            refreshtitle: "Ponovo preuzmi podatke",
            alertcap: "Upozorenje",
            alerttext: "Molim, odaberi red",
            viewtext: "",
            viewtitle: "Pregled obilježenog reda",
            savetext: "",
            savetitle: "Save row",
            canceltext: "",
            canceltitle: "Cancel row editing",
            selectcaption: "Actions..."
        },
        col: {caption: "Obilježi kolonu", bSubmit: "Uredu", bCancel: "Odustani"},
        errors: {
            errcap: "Greška",
            nourl: "Nedostaje URL",
            norecords: "Bez zapisa za obradu",
            model: "colNames i colModel imaju različitu duljinu!"
        },
        formatter: {
            integer: {thousandsSeparator: ".", defaultValue: "0"},
            number: {decimalSeparator: ",", thousandsSeparator: ".", decimalPlaces: 2, defaultValue: "0,00"},
            currency: {
                decimalSeparator: ",",
                thousandsSeparator: ".",
                decimalPlaces: 2,
                prefix: "",
                suffix: "",
                defaultValue: "0,00"
            },
            date: {
                dayNames: ["Ned", "Pon", "Uto", "Sri", "Čet", "Pet", "Sub", "Nedjelja", "Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak", "Subota"],
                monthNames: ["Sij", "Velj", "Ožu", "Tra", "Svi", "Lip", "Srp", "Kol", "Ruj", "Lis", "Stu", "Pro", "Siječanj", "Veljača", "Ožujak", "Travanj", "Svibanj", "Lipanj", "Srpanj", "Kolovoz", "Rujan", "Listopad", "Studeni", "Prosinac"],
                AmPm: ["am", "pm", "AM", "PM"],
                S: function () {
                    return ""
                },
                srcformat: "Y-m-d",
                newformat: "d.m.Y.",
                parseRe: /[#%\\\/:_;.,\t\s-]/,
                masks: {
                    ISO8601Long: "Y-m-d H:i:s",
                    ISO8601Short: "Y-m-d",
                    ShortDate: "d.m.Y.",
                    LongDate: "l, j. F Y",
                    FullDateTime: "l, j. F Y H:i:s",
                    MonthDay: "d F",
                    ShortTime: "H:i",
                    LongTime: "H:i:s",
                    SortableDateTime: "Y-m-d\\TH:i:s",
                    UniversalSortableDateTime: "Y-m-d H:i:sO",
                    YearMonth: "F Y"
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