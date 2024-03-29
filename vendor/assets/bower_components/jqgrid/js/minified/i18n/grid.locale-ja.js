!function (a) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery", "../grid.base"], a) : a(jQuery)
}(function (a) {
    a.jgrid = a.jgrid || {}, a.jgrid.hasOwnProperty("regional") || (a.jgrid.regional = []), a.jgrid.regional.ja = {
        defaults: {
            recordtext: "{2} 件中 {0} - {1} を表示 ",
            emptyrecords: "表示するレコードがありません",
            loadtext: "読み込み中...",
            pgtext: "{1} ページ中 {0} ページ目 ",
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
            caption: "検索...",
            Find: "検索",
            Reset: "リセット",
            odata: [{oper: "eq", text: "次に等しい"}, {oper: "ne", text: "次に等しくない"}, {
                oper: "lt",
                text: "次より小さい"
            }, {oper: "le", text: "次に等しいか小さい"}, {oper: "gt", text: "次より大きい"}, {
                oper: "ge",
                text: "次に等しいか大きい"
            }, {oper: "bw", text: "次で始まる"}, {oper: "bn", text: "次で始まらない"}, {oper: "in", text: "次に含まれる"}, {
                oper: "ni",
                text: "次に含まれない"
            }, {oper: "ew", text: "次で終わる"}, {oper: "en", text: "次で終わらない"}, {oper: "cn", text: "次を含む"}, {
                oper: "nc",
                text: "次を含まない"
            }, {oper: "nu", text: "is null"}, {oper: "nn", text: "is not null"}],
            groupOps: [{op: "AND", text: "すべての"}, {op: "OR", text: "いずれかの"}],
            operandTitle: "Click to select search operation.",
            resetTitle: "Reset Search Value"
        },
        edit: {
            addCaption: "レコード追加",
            editCaption: "レコード編集",
            bSubmit: "送信",
            bCancel: "キャンセル",
            bClose: "閉じる",
            saveData: "データが変更されています。保存しますか？",
            bYes: "はい",
            bNo: "いいえ",
            bExit: "キャンセル",
            msg: {
                required: "この項目は必須です。",
                number: "正しい数値を入力して下さい。",
                minValue: "次の値以上で入力して下さい。",
                maxValue: "次の値以下で入力して下さい。",
                email: "e-mailが正しくありません。",
                integer: "正しい整数値を入力して下さい。",
                date: "正しい値を入力して下さい。",
                url: "は有効なURLではありません。プレフィックスが必要です。 ('http://' または 'https://')",
                nodefined: " が定義されていません",
                novalue: " 戻り値が必要です",
                customarray: "カスタム関数は配列を返す必要があります",
                customfcheck: "カスタム検証にはカスタム関数が必要です"
            }
        },
        view: {caption: "レコードを表示", bClose: "閉じる"},
        del: {caption: "削除", msg: "選択したレコードを削除しますか？", bSubmit: "削除", bCancel: "キャンセル"},
        nav: {
            edittext: " ",
            edittitle: "選択した行を編集",
            addtext: " ",
            addtitle: "行を新規追加",
            deltext: " ",
            deltitle: "選択した行を削除",
            searchtext: " ",
            searchtitle: "レコード検索",
            refreshtext: "",
            refreshtitle: "グリッドをリロード",
            alertcap: "警告",
            alerttext: "行を選択して下さい。",
            viewtext: "",
            viewtitle: "選択した行を表示",
            savetext: "",
            savetitle: "Save row",
            canceltext: "",
            canceltitle: "Cancel row editing",
            selectcaption: "Actions..."
        },
        col: {caption: "列を表示／隠す", bSubmit: "送信", bCancel: "キャンセル"},
        errors: {
            errcap: "エラー",
            nourl: "URLが設定されていません。",
            norecords: "処理対象のレコードがありません。",
            model: "colNamesの長さがcolModelと一致しません。"
        },
        formatter: {
            integer: {thousandsSeparator: ",", defaultValue: "0"},
            number: {decimalSeparator: ".", thousandsSeparator: ",", decimalPlaces: 2, defaultValue: "0.00"},
            currency: {
                decimalSeparator: ".",
                thousandsSeparator: ",",
                decimalPlaces: 0,
                prefix: "",
                suffix: "",
                defaultValue: "0"
            },
            date: {
                dayNames: ["日", "月", "火", "水", "木", "金", "土", "日", "月", "火", "水", "木", "金", "土"],
                monthNames: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
                AmPm: ["am", "pm", "AM", "PM"],
                S: function () {
                    return "番目"
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