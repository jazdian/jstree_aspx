
(function () {

    let val_uri = $("input[uri-trg='r']").val()
    let crear_tabla = document.querySelector("#crear_tabla")
    let list_temas = document.querySelector(".jstree-children")

    let emisoras_data = document.querySelector("#emisoras_data")
    let emisoras_arr = document.querySelector("#emisoras_arr")
    let emisoras_ids = document.querySelector("#emisoras_ids")
    let emisoras_txt = document.querySelector("#emisoras_txt") 

    let anios_data = document.querySelector("#anios_data")
    let anios_ids = document.querySelector("#anios_ids")
    let anios_arr = document.querySelector("#anios_arr")
    let anios_txt = document.querySelector("#anios_txt") 

    let tree_temas_cols_loaded = document.querySelector("#tree_temas_cols_loaded")

    let sel_emisoras = document.querySelector("#sel_emisoras")
    let sel_anios = document.querySelector("#sel_anios")

    let name_reporte = document.querySelector("#name_reporte")
    let id_reporte = document.querySelector("#id_reporte")
    let columnas = document.querySelector("#columnas")
    let columnas_id = document.querySelector("#columnas_id")
    let filtro_emisora = document.querySelector("#filtro_emisora")
    let filtro_anio = document.querySelector("#filtro_anio")
    let filtro_emisora_id = document.querySelector("#filtro_emisora_id")

    let data_dummy = [
        { "Sistema": "Bienvenidos", "Reportes": "Al sistema", "Dinámicos": "ASG" }
    ]

    window.addEventListener("load", async function () {

        // Datos dummys para inciar el pivotGrid
        let str_campos_arr = "Sistema,Reportes,Dinámicos".split(',');
        let str_tdato_arr = "string,string,string".split(',');
        let str_etiqueta_arr = "EMISOR,AÑO,VALOR".split(',');
        let size_pixel_col = "100,100,150".split(',')
        await gridKendo(data_dummy, str_campos_arr, str_tdato_arr, size_pixel_col, "#grid")

        await getListAnios()
        await getListEmisoras()
        await getListTemas()
        await configuracionesIniciales()

        document.querySelector("#tree_temas").addEventListener("dblclick", getListTemasColumnas)

        crear_tabla.addEventListener("click", generaReporteGK)
        sel_anios.addEventListener("change", () => filtro_anio.value = sel_anios.value)
        sel_emisoras.addEventListener("change", function () {
            filtro_emisora.value = sel_emisoras.value
            filtro_emisora_id.value = sel_emisoras.options[sel_emisoras.selectedIndex].text
        })

    })

    const configuracionesIniciales = async function () {

        filtro_emisora.value = sel_emisoras.value
        filtro_anio.value = sel_anios.value
        //filtro_emisora_id.value = sel_emisoras.options[sel_emisoras.selectedIndex].text

        $("#tree_temas_cols").on("select_node.jstree", onSelectNodeCols);
        $("#tree_temas_cols").on("deselect_node.jstree", onDeselectNodeCols);

        var $Emisoras = $('#sel_emisoras').select2()
        var $Anios = $('#sel_anios').select2()

        $Emisoras.select2({
            placeholder: 'Seleccione Emisoras',
            closeOnSelect: false,
        });

        $Emisoras.on("select2:select", (e) => {

            let emisoras_arr = getObjectSelect(Array.from($Emisoras[0].selectedOptions))
            emisoras_txt.value = emisoras_arr[emisoras_arr.length - 1][emisoras_arr.length - 1].acutext
            emisoras_ids.value = emisoras_arr[emisoras_arr.length - 1][emisoras_arr.length - 1].acuid
            let elem = $("#sel_sector + span")
            console.log(emisoras_ids.value, "==", emisoras_txt.value)

        });

        $Emisoras.on("select2:unselect", (e) => {
            let emisoras_arr = getObjectSelect(Array.from($Emisoras[0].selectedOptions))
            emisoras_txt.value = (emisoras_arr.length == 0) ? "0" : emisoras_arr[emisoras_arr.length - 1][emisoras_arr.length - 1].acutext
            emisoras_ids.value = (emisoras_arr.length == 0) ? "0" : emisoras_arr[emisoras_arr.length - 1][emisoras_arr.length - 1].acuid
            console.log(emisoras_ids.value, "==", emisoras_txt.value)
        });

        $Anios.select2({
            placeholder: 'Seleccione un Año',
            closeOnSelect: true,
            maximumSelectionLength: 1
        });

        $Anios.on("select2:select", (e) => {

            let anios_arr = getObjectSelect(Array.from($Anios[0].selectedOptions))
            anios_txt.value = anios_arr[anios_arr.length - 1][anios_arr.length - 1].acutext
            anios_ids.value = anios_arr[anios_arr.length - 1][anios_arr.length - 1].acuid
            let elem = $("#sel_subindi + span")
            console.log(anios_ids.value, "==", anios_txt.value)

        });

        $Anios.on("select2:unselect", (e) => {
            let anios_arr = getObjectSelect(Array.from($Anios[0].selectedOptions))
            anios_txt.value = (anios_arr.length == 0) ? "0" : anios_arr[anios_arr.length - 1][anios_arr.length - 1].acutext
            anios_ids.value = (anios_arr.length == 0) ? "0" : anios_arr[anios_arr.length - 1][anios_arr.length - 1].acuid
            console.log(anios_ids.value, "==", anios_txt.value)
        });


    }

    // CARGA EL PRIMER JSTREE TEMAS
    const getListTemas = async function () {

        await $.ajax({
            async: true,
            url: val_uri + 'ReportesASG/TemasAll',
            data: {
                'num_query': '4',
                'id': '0',
                'str_id_emisores': '0'
            },
            type: 'GET',
            success: function (data) {
                let temas = ""

                data.map(function (obj, i) {
                    temas += `{ "Id":"${obj.Id}", "text": "${obj.Id}. ${decodeURIComponent(escape(obj.ClassName)) }" },`
                })

                temas = temas.substring(0, (temas.length - 1))

                let json_temas = `{"text": "Reportes Dinámicos","state": {"opened": true },"children": [${temas}]}`
                json_temas = JSON.parse(json_temas)

                console.log("Temas:",json_temas)

                $('#tree_temas').jstree({
                    "core": {
                        "data": [json_temas]
                    }
                })

            }
        });

    }

    // CARGA EL JSTREE COLUMNAS POR TEMA
    const getListTemasColumnas = async function (e) {

        let array_reporte = e.target.text.split(".")
        console.log(array_reporte)

        id_reporte.value = array_reporte[0]
        name_reporte.value = array_reporte[1].trim()

        //const tree_cols = document.querySelector('#tree_temas_cols')
        //while (tree_cols.firstChild) { tree_cols.removeChild(tree_cols.firstChild); }

        $.ajax({
            async: false,
            url: val_uri + `Survey/EMICamposReporteList?Id=${ id_reporte.value }`,
            type: 'get',
            success: function (data_response) {

                console.table("columnas:", data_response)
                let column = ""

                data_response.map(function (obj, i) {
                    let icon = ((obj.TipoDato == 'decimal' || obj.TipoDato == 'int') ? "fa fa-superscript" : "fa fa-align-left")
                    column += `{ "Id":"${obj.id}", "text": "${obj.Nombre}", "icon": "${icon}", "selected":true ,"li_attr" : { "class" : "${obj.Id}" }},`
                })

                let columns = column.substring(0, (column.length - 1))
                let json_columns = `{"text": "${name_reporte.value}", "children": [${columns}], "state": {"opened": true }}`

                json_columns= JSON.parse(json_columns)

                // al cargar por primera vez
                if (tree_temas_cols_loaded.value == "0") {
                    tree_temas_cols_loaded.value = 1
                    $('#tree_temas_cols').jstree({
                        "core": {
                            "data": [json_columns]
                        },
                        "plugins": ["wholerow", "checkbox"]
                    })
                } else {
                    // si ya existe el jstree lo destruimos y volvemos a cargar datos
                    $('#tree_temas_cols').jstree(true).destroy()
                    $('#tree_temas_cols').jstree({
                        "core": {
                            "data": [json_columns]
                        },
                        "plugins": ["wholerow", "checkbox"]
                    })

                    $('#tree_temas_cols').jstree(true).redraw()
                    $('#tree_temas_cols').jstree(true).refresh()

                    $("#tree_temas_cols").on("select_node.jstree", onSelectNodeCols);
                    $("#tree_temas_cols").on("deselect_node.jstree", onDeselectNodeCols);

                    $('#tree_temas_cols').jstree("select_node", '1', false);
                }

            },
            failure: function (fail) {
                toastr.error(fail, "");
            },
            Error: function (er) {
                toastr.error(er, "");
            }
        });

        //$('#tree_temas_cols').jstree({
        //    "core": {
        //        'data': [
        //            {
        //                'text': 'Evaluaciones ASG',
        //                'children': [
        //                    {
        //                        'text': 'Año', 'icon': 'fa fa-align-left'
        //                    },
        //                    {
        //                        'text': 'FechaOperacionNav', 'icon': 'fa fa-align-left'
        //                    },
        //                    {
        //                        'text': 'Emisor', 'icon': 'fa fa-align-left'
        //                    },
        //                    {
        //                        'text': 'TV_emisor_serie', 'icon': 'fa fa-align-left'
        //                    },
        //                    {
        //                        'text': 'Score_ASG', 'icon': 'fa fa-superscript'
        //                    },
        //                    {
        //                        'text': 'Rating_Score_ASG', 'icon': 'fa fa-align-left'
        //                    },
        //                    {
        //                        'text': 'Score_Pilar_Ambiental', 'icon': 'fa fa-superscript'
        //                    },
        //                    {
        //                        'text': 'Rating_Pilar_Ambiental', 'icon': 'fa fa-align-left'
        //                    },
        //                    {
        //                        'text': 'Ambiental', 'icon': 'fa fa-superscript'
        //                    },
        //                    {
        //                        'text': 'Rating_Ambiental', 'icon': 'fa fa-align-left'
        //                    }
        //                ],
        //                'state': {
        //                    'opened': true
        //                }
        //            }
        //        ]
        //    },
        //    "plugins": ["wholerow", "checkbox"]
        //}); 

    }

    const getListEmisoras = async function () {

        await $.ajax({
            async: true,
            url: val_uri + 'ReportesASG/EmisorasAll',
            data: {
                'num_query': '3',
                'id': '0',
                'str_id_emisores': `Tipo_Emisor IN (0)`
            },
            type: 'GET',
            success: data => {

                data = data.dataEmisora

                data.unshift({
                    Emisor_Id: 0,
                    Emisor_Nombre: "Todas las Emisoras",
                    Emisor_RazonSocial: "",
                    Emisor_Correo: "",
                    Emisor_Direccion: "",
                    Emisor_Telefono: "",
                    Clase_Activo: 0,
                    Folio_VU: "",
                    Isin: "",
                    Tipo_Emisor: 0
                })

                data.map(function (obj, i) {
                    $('#sel_emisoras').append('<option value="' + obj.Emisor_Id + '">' + obj.Emisor_Nombre + '</option>')
                })

                console.log("ListEmisoras:", data)
            }
        });

    }

    const getListAnios = async function () {

        let anios_dat = [
            { "id_anio": 2019, "anio": 2019 },
            { "id_anio": 2020, "anio": 2020 },
            { "id_anio": 2021, "anio": 2021 },
            { "id_anio": 2022, "anio": 2022 },
            { "id_anio": 2023, "anio": 2023 }
        ]

        anios_dat.map(function (obj, i) {
            $('#sel_anios').append('<option value="' + obj.id_anio + '">' + obj.anio + '</option>')
        })

        console.log("ListAños", anios_dat)

    }

    const onSelectNodeCols = function (evt, data) {
        console.log(data.node.id);
        console.log(data.node.text);

        var checked_text = [];
        var checked_ids = [];

        var selectedNodes = $('#tree_temas_cols').jstree("get_selected", true);
        $.each(selectedNodes, function () {
            checked_text.push(this.text);
            checked_ids.push(this.li_attr.class);
        });

        columnas.value = checked_text;
        columnas_id.value = checked_ids
        console.log(checked_text)
        console.log(checked_ids)
    }

    const onDeselectNodeCols = function (evt, data) {
        console.log(data.node.id);
        console.log(data.node.text);

        var checked_text = [];
        var checked_ids = [];

        var selectedNodes = $('#tree_temas_cols').jstree("get_selected", true);
        $.each(selectedNodes, function () {
            checked_text.push(this.text);
            checked_ids.push(this.li_attr.class);
        });

        columnas.value = checked_text;
        columnas_id.value = checked_ids
        console.log(checked_text)
        console.log(checked_ids)
    }

    // GENERA LA TABLA #########################################################################################

    const generaReporteGK = async function (e) {

        e.preventDefault()
        $('#modalwaitp').modal('show')
        if (id_reporte.value == "") {
            toastr.warning("Necesita seleccionar un Tema.", "Reportes ASG");
            $('#modalwaitp').modal('hide')
            return;
        }

        var checked_text = [];
        var checked_ids = [];
        var selectedNodes = $('#tree_temas_cols').jstree("get_selected", true);
        $.each(selectedNodes, function () {
            if (this.text != name_reporte.value) {
                checked_text.push(this.text);
                checked_ids.push(this.li_attr.class);
            }
        });
        columnas.value = checked_text;
        columnas_id.value = checked_ids
        console.log(checked_text)
        console.log(checked_ids)

        if (columnas_id.value == "") {
            toastr.warning("Necesita seleccionar algunos campos del reporte.", "Reportes ASG");
            $('#modalwaitp').modal('hide')
            return;
        }

        let tema = id_reporte.value
        let columnasTxt = checked_text
        let columnasId = checked_ids
        let emisoras = emisoras_ids.value
        let anio = anios_ids.value

        localStorage.setItem("tema", tema)
        localStorage.setItem("columnas", columnasId)
        localStorage.setItem("emisoras", emisoras)
        localStorage.setItem("anio", anio)

        let ajax_url
        if (false) {
            ajax_url = `ReportesASG/ReportDinamy?opciones=0&Temas=0&activo=0&emisor=0&sector=0&anio=2020&subindi=0`
        } else {
            ajax_url = `ReportesASG/DynamicReporter?Temas=${tema}&columnas=${columnasTxt}&ColumnasId=${columnasId}&emisor=AND Emisor_Id IN (${emisoras})&anio=${anio}`
        }
        console.log(val_uri + ajax_url)
        $.ajax({

            async: false,
            url: val_uri + ajax_url,
            type: 'get',
            success: function (data_response) {

                if (data_response == null || data_response.Table.length == 0) {
                    $('#modalwaitp').modal('hide')
                    $('#datatablesKg').hide()
                    toastr.warning("No hay datos para esta consulta.", "ASG")
                    const grid_kendo = document.querySelector('#grid')
                    while (grid_kendo.firstChild) { grid_kendo.removeChild(grid_kendo.firstChild); }
                    return
                }

                console.log("Reporte Grid Table", data_response)

                reporteTipoGeneral(data_response)

            }

        });

    }

    const reporteTipoGeneral = async function (data_response) {

        let bd, cols, tdato, etiquetas, datos, columnas

        // array con los titulos[0], columnas[1], labels[2], tipo_dato[3] y datos[4], cantidad_caracteres[5]
        datos = SanitizarDatosDT(data_response.Table)

        bd = datos[4]
        cols = datos[2]
        tdato = datos[3]
        size_pixel = datos[5]

        console.log("Sanitizador", datos)

        const grid_kendo = document.querySelector('#grid')

        while (grid_kendo.firstChild) { grid_kendo.removeChild(grid_kendo.firstChild); }

        gridKendo(bd, cols, tdato, size_pixel, '#grid').then(resp => {
            $('#modalwaitp').modal('hide')
            toastr.success("Se ha creado el reporte solicitado.", "ASG")
            $('#datatablesKg').show()
            $('#tabla_dinamica').hide(500)
            window.scroll({
                top: 0,
                behavior: "smooth"
            });

            var gridElement = $("#grid"),
                newHeight = gridElement.innerHeight(),
                otherElements = gridElement.children().not(".k-grid-content"),
                otherElementsHeight = 0;

            otherElements.each(function () {
                otherElementsHeight += $(this).outerHeight();
            });

            gridElement.children(".k-grid-content").height(newHeight - otherElementsHeight);


        })

    }

    jq31 = jQuery.noConflict(true)
    const gridKendo = async function (data, str_campos_arr, str_tdato_arr, size_pixel, nom_table) {

        // fields ======================================================================

        let obj_string = "";
        str_tdato_arr.forEach(function (element, i) {
            element = (element == 'int' || element == 'decimal') ? 'number' : 'string'
            obj_string += `"${str_campos_arr[i]}":{"type":"${element}"},`
        })

        obj_string = obj_string.substring(0, (obj_string.length - 1))
        obj_string = "{" + obj_string + "}"

        let obj_fields = ""
        obj_fields = `{"fields": ${obj_string} }`
        //obj_fields = `${obj_string}`
        obj_fields = JSON.parse(obj_fields)
        //console.log("obj_fields: ", obj_fields)
        // END fields ==================================================================

        // ANCHO COLUMNAS  ======================================================================

        let ancho
        let fields_width = ""
        str_campos_arr.map(function (field, i) {

            if (size_pixel[i] >= 1200) {
                ancho = "800px"
            } else if (size_pixel[i] >= 800) {
                ancho = "700px"
            } else if (size_pixel[i] >= 500) {
                ancho = "600px"
            } else if (size_pixel[i] >= 250) {
                ancho = "400px"
            } else if (size_pixel[i] >= 100) {
                ancho = "300px"
            } else if (size_pixel[i] >= 25) {
                ancho = "180px"
            } else {
                ancho = "120px"
            }

            fields_width += `{"field": "${field}", "width": "${ancho}"},`
        })

        fields_width = fields_width.substring(0, (fields_width.length - 1))
        fields_width = "[" + fields_width + "]"
        fields_width = JSON.parse(fields_width)

        //console.log("fields_width", fields_width)

        // END ANCHO COLUMNAS  ==================================================================

        jq31(nom_table).kendoGrid({
            toolbar: ["excel", "search"],
            excel: {
                fileName: /*temas_txt.value*/ "Indicadores" + "_Reporte ASG.xlsx",
                proxyURL: "https://demos.telerik.com/kendo-ui/service/export",
                filterable: true,
                allPages: true
            },
            dataSource: {
                data: data,
                schema: {
                    model: obj_fields
                },
                pageSize: 25
            },
            //group: {
            //    field: "UnitsInStock", aggregates: [
            //        { field: "ProductName", aggregate: "count" },
            //        { field: "UnitPrice", aggregate: "sum" },
            //        { field: "UnitsOnOrder", aggregate: "average" },
            //        { field: "UnitsInStock", aggregate: "count" }
            //    ]
            //},
            //width: ancho_tabla,
            scrollable: true,
            sortable: true,
            //groupable: true,
            reorderable: true,
            resizable: true,
            filterable: true,
            pageable: {
                input: true,
                numeric: false
            },
            height: 370,
            columns: fields_width
            //dataSource: {
            //    data: products,
            //    schema: {
            //        model: {
            //            fields: {
            //                ProductName: { type: "string" },
            //                UnitPrice: { type: "number" },
            //                UnitsInStock: { type: "number" },
            //                Discontinued: { type: "boolean" }
            //            }
            //        }
            //    },
            //    pageSize: 20
            //},
            //columns: [
            //    { field: "name", width: "200px" },
            //    { field: "age" }
            //]
            //"ProductName",
            //{ field: "UnitPrice", title: "Unit Price", format: "{0:c}", width: "130px" },
            //{ field: "UnitsInStock", title: "Units In Stock", width: "130px" },
            //{ field: "Discontinued", width: "130px" }

        });

    }

    const SanitizarDatosDT = (data) => {

        let titlesdt = []
        let columnsdt = []
        let labelspg = []
        let size_str = []
        let tipeof = []
        let ndata = []
        let keys = []

        // Obtenemos las claves del objeto
        keys = Object.keys(data[0])

        // Depuramos los nombres de las claves
        keys.map(function ( key, i ) {

            let objt = { "title": key.replace(/[\n\ \r\t\•]/g, '_').replace(/[\(\)\¿\?\,]/g, ''), "targets": i }
            let objc = { "data": key.replace(/[\n\ \r\t\•]/g, '_').replace(/[\(\)\¿\?\,]/g, '') }

            labelspg.push(key.replace(/[\n\ \r\t\•]/g, '_').replace(/[\(\)\¿\?\,]/g, ''))
            titlesdt.push(objt)
            columnsdt.push(objc)

        })

        // recorremos todas las filas
        data.map(function (row_json, i) {

            let nrow = {}
            
            keys.forEach(function (label, i) {
                //quitamos vacíos, nulos y saltos de linea y tabuladores
                if (row_json[label] == null || row_json[label] == '') {
                    nrow[labelspg[i]] = "0"
                } else { 

                    if (typeof (row_json[label]) == "string") {
                        nrow[labelspg[i]] = row_json[label].replace(/[\n\r\t\•]/g, ' ')
                    } else {
                        nrow[labelspg[i]] = row_json[label]
                    }
                    
                }

            })
            ndata.push(nrow)
        })

        // Obtenemos la cantidad maxima de caracteres X columnas para calcular el ancho de la columna
        labelspg.map(function (key, i) {
            let max_col = []
            ndata.map(function (obj, x) {
                //si es número debemos convertir a string para contar los caracteres
                max_col.push( String(obj[key]).length)
            })

            size_str.push(Math.max(...max_col))

        })

        // Obtenemos el tipo de dato
        for (var value of Object.values(ndata[0])) {
            tipeof.push(typeof (value))
        }

        //console.log(titlesdt, columnsdt, labelspg, tipeof, ndata)
        return [titlesdt, columnsdt, labelspg, tipeof, ndata, size_str]

    }

    const getObjectSelect = (arreglo) => {

        let arr = []
        let acuid = ""
        let acutext = ""
        let objeto = arreglo.map(function (el) {

            let obj = {}

            acuid += el.value + ","
            acutext += el.text + ","

            obj.id = el.value
            obj.text = el.text
            obj.title = el.title
            obj.acuid = acuid.substring(0, (acuid.length - 1))
            obj.acutext = acutext.substring(0, (acutext.length - 1))

            arr.push(obj)
            return arr

        })

        return objeto
    }

})();