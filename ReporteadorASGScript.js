

    // VARIABLES
    let val_uri = $("input[uri-trg='r']").val()

    let temas_data = document.querySelector("#temas_data")
    let temas_arr = document.querySelector("#temas_arr") 
    let temas_ids = document.querySelector("#temas_ids") 
    let temas_txt = document.querySelector("#temas_txt") 
    let activos_data = document.querySelector("#activos_data") 
    let activos_arr = document.querySelector("#activos_arr") 
    let activos_ids = document.querySelector("#activos_ids") 
    let activos_txt = document.querySelector("#activos_txt") 
    let emisoras_data = document.querySelector("#emisoras_data") 
    let emisoras_arr = document.querySelector("#emisoras_arr") 
    let emisoras_ids = document.querySelector("#emisoras_ids") 
    let emisoras_txt = document.querySelector("#emisoras_txt") 
    let sectores_data = document.querySelector("#sectores_data") 
    let sectores_arr = document.querySelector("#sectores_arr") 
    let sectores_ids = document.querySelector("#sectores_ids") 
    let sectores_txt = document.querySelector("#sectores_txt") 
    let anios_data = document.querySelector("#anios_data") 
    let anios_ids = document.querySelector("#anios_ids") 
    let anios_arr = document.querySelector("#anios_arr") 
    let anios_txt = document.querySelector("#anios_txt") 
    let subindi_arr = document.querySelector("#subindi_arr") 
    let subindi_ids = document.querySelector("#subindi_ids") 
    let subindi_txt = document.querySelector("#subindi_txt") 
    let subindi_data = document.querySelector("#subindi_data") 
    let columnas_data = document.querySelector("#columnas_data")
    let columnas_ids = document.querySelector("#columnas_ids")
    let columnas_arr = document.querySelector("#columnas_arr")
    let columnas_txt = document.querySelector("#columnas_txt") 

    let content_tabs_7 = document.querySelector('#content_tabs_7')

    let data_tosend = [
        { temas: "" },
        { activos: "" },
        { emisoras: "" },
        { sectores: "" },
        { anios: "" },
        { subindi: "" }
    ]

    let data_dummy = [
        { Emisor_Nombre: "ARCA", yearScoreAsg: 2020, "Puntos_Cambio_climático": 10 },
        { Emisor_Nombre: "ALFA", yearScoreAsg: 2020, "Puntos_Cambio_climático": 7.6 },
        { Emisor_Nombre: "AMOVIL", yearScoreAsg: 2020, "Puntos_Cambio_climático": 9.33 },
        { Emisor_Nombre: "ASUR", yearScoreAsg: 2020, "Puntos_Cambio_climático": 8.17 },
        { Emisor_Nombre: "BIMBO", yearScoreAsg: 2020, "Puntos_Cambio_climático": 10 },
        { Emisor_Nombre: "BOLSA", yearScoreAsg: 2020, "Puntos_Cambio_climático": 4.83 },
        { Emisor_Nombre: "CEMEX", yearScoreAsg: 2020, "Puntos_Cambio_climático": 8.55 },
        { Emisor_Nombre: "CHEDRAUI", yearScoreAsg: 2020, "Puntos_Cambio_climático": 0 },
        { Emisor_Nombre: "CUERVO", yearScoreAsg: 2020, "Puntos_Cambio_climático": 0 },
        { Emisor_Nombre: "FEMSA", yearScoreAsg: 2020, "Puntos_Cambio_climático": 5 }
    ]

    // ARRANQUE

    addEventListener('beforeunload', event => {  });

    window.addEventListener('load', async function () {

        $('#modalwaitp').modal('show')

        configuracionesIniciales()

        // Datos dummys para inciar el pivotGrid
        let str_campos_arr = "Emisor_Nombre,yearScoreAsg,Puntos_Cambio_climático".split(',');
        let str_tdato_arr = "string,int,decimal".split(',');
        let str_etiqueta_arr = "EMISOR,AÑO,VALOR".split(',');
        await pivotGrid(data_dummy, str_campos_arr, str_tdato_arr, str_etiqueta_arr)

        await gridKendo(data_dummy, str_campos_arr, str_tdato_arr, str_etiqueta_arr)

        // Datos dummys para inciar el DataTable
        //let tits = [{"title": "Emisor_Nombre","targets": 0},{"title": "yearScoreAsg","targets": 1},{"title": "Puntos_Cambio_climático","targets": 2}]
        //let cols = [{ "data": "Emisor_Nombre" }, { "data": "yearScoreAsg" }, { "data": "Puntos_Cambio_climático" }]
        //await dataTable(data_dummy, cols, tits)

        
        await getListAnios()
        await getListActivos()
        await getListTemas().then(res => {
            $('#modalwaitp').modal('hide')
        })

        //document.querySelector("#genera_rep").addEventListener("click", generarReporte)
        document.querySelector("#genera_rep").addEventListener("click", generaReporteGK)
        document.querySelector("#genera_rep_din").addEventListener("click", generarReporteDin)

    })

    toastr.options = {
        "closeButton": true,
        "debug": false,
        "newestOnTop": false,
        "progressBar": true,
        "positionClass": "toast-top-right",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    }

    // CARGA DE DATOS INICIALES =============================================

    const configuracionesIniciales = function () {

        var $Temas = $('#sel_temas').select2()
        var $Activos = $("#sel_activos").select2()
        var $Emisoras = $('#sel_emisoras').select2()
        var $Sectores = $('#sel_sector').select2()
        var $Anios = $('#sel_anios').select2()
        var $Subindi = $('#sel_subindi').select2()
        var $Columnas = $('#sel_columnas').select2()

        $Temas.select2({
            placeholder: 'Seleccione un Tema',
            closeOnSelect: true,
            maximumSelectionLength: 1
        });

        $Temas.on('select2:select', function (e) {

            let temas_arr = getObjectSelect(Array.from($Temas[0].selectedOptions))
            temas_txt.value = temas_arr[temas_arr.length - 1][temas_arr.length - 1].acutext
            temas_ids.value = temas_arr[temas_arr.length - 1][temas_arr.length - 1].acuid
            getDatosSubindicadores()
            let elem = $("#sel_activos + span")
            focusShinyBorder(elem)
            console.log(temas_ids.value, "==", temas_txt.value)

        });

        $Temas.on("select2:unselect", function (e) {

            let temas_arr = getObjectSelect(Array.from($Temas[0].selectedOptions))
            temas_txt.value = (temas_arr.length == 0) ? "0" : temas_arr[temas_arr.length - 1][temas_arr.length - 1].acutext
            temas_ids.value = (temas_arr.length == 0) ? "0" : temas_arr[temas_arr.length - 1][temas_arr.length - 1].acuid
            getDatosSubindicadores()
            console.log(temas_ids.value, "==", temas_txt.value)
        });

        console.log($Activos[0])
        // ====================================================================================
        
        $Activos.select2({
            placeholder: 'Seleccione Activos',
            closeOnSelect: false,
        });

        $Activos.on("select2:select", (e) => {

            let activos_arr = getObjectSelect(Array.from($Activos[0].selectedOptions))
            activos_txt.value = activos_arr[activos_arr.length - 1][activos_arr.length - 1].acutext
            activos_ids.value = activos_arr[activos_arr.length - 1][activos_arr.length - 1].acuid
            nextActivosEmisoras()
            let elem = $("#sel_emisoras + span")
            focusShinyBorder(elem)
            console.log(activos_ids.value, "==", activos_txt.value)
        });

        $Activos.on("select2:unselect", (e) => {

            let activos_arr = getObjectSelect(Array.from($Activos[0].selectedOptions))
            activos_txt.value = (activos_arr.length == 0) ? "0" : activos_arr[activos_arr.length - 1][activos_arr.length - 1].acutext
            activos_ids.value = (activos_arr.length == 0) ? "0" : activos_arr[activos_arr.length - 1][activos_arr.length - 1].acuid
            nextActivosEmisoras()
            console.log(activos_ids.value, "==", activos_txt.value)
        });

        // ====================================================================================

        $Emisoras.select2({
            placeholder: 'Seleccione Emisoras',
            closeOnSelect: false,
        });

        $Emisoras.on("select2:select", (e) => {

            let emisoras_arr = getObjectSelect(Array.from($Emisoras[0].selectedOptions))
            emisoras_txt.value = emisoras_arr[emisoras_arr.length - 1][emisoras_arr.length - 1].acutext
            emisoras_ids.value = emisoras_arr[emisoras_arr.length - 1][emisoras_arr.length - 1].acuid
            nextEmisorasSectores()
            let elem = $("#sel_sector + span")
            focusShinyBorder(elem)
            console.log(emisoras_ids.value, "==", emisoras_txt.value)

        });

        $Emisoras.on("select2:unselect", (e) => {
            let emisoras_arr = getObjectSelect(Array.from($Emisoras[0].selectedOptions))
            emisoras_txt.value = (emisoras_arr.length == 0) ? "0" : emisoras_arr[emisoras_arr.length - 1][emisoras_arr.length - 1].acutext
            emisoras_ids.value = (emisoras_arr.length == 0) ? "0" : emisoras_arr[emisoras_arr.length - 1][emisoras_arr.length - 1].acuid
            nextEmisorasSectores()
            console.log(emisoras_ids.value, "==", emisoras_txt.value)
        });

        // ====================================================================================

        $Sectores.select2({
            placeholder: 'Seleccione Sectores',
            closeOnSelect: false,
        });

        $Sectores.on("select2:select", (e) => {

            let sectores_arr = getObjectSelect(Array.from($Sectores[0].selectedOptions))
            sectores_txt.value = sectores_arr[sectores_arr.length - 1][sectores_arr.length - 1].acutext
            sectores_ids.value = sectores_arr[sectores_arr.length - 1][sectores_arr.length - 1].acuid
            nextSectoresAnios()
            let elem = $("#sel_anios + span")
            focusShinyBorder(elem)
            console.log(sectores_ids.value, "==", sectores_txt.value)

        });

        $Sectores.on("select2:unselect", (e) => {
            let sectores_arr = getObjectSelect(Array.from($Sectores[0].selectedOptions))
            sectores_txt.value = (sectores_arr.length == 0) ? "0" : sectores_arr[sectores_arr.length - 1][sectores_arr.length - 1].acutext
            sectores_ids.value = (sectores_arr.length == 0) ? "0" : sectores_arr[sectores_arr.length - 1][sectores_arr.length - 1].acuid
            nextSectoresAnios()
            console.log(sectores_ids.value, "==", sectores_txt.value)
        });

        // ====================================================================================

        $Anios.select2({
            placeholder: 'Seleccione un Año',
            closeOnSelect: true,
            maximumSelectionLength: 1
        });

        $Anios.on("select2:select", (e) => {

            let anios_arr = getObjectSelect(Array.from($Anios[0].selectedOptions))
            anios_txt.value = anios_arr[anios_arr.length - 1][anios_arr.length - 1].acutext
            anios_ids.value = anios_arr[anios_arr.length - 1][anios_arr.length - 1].acuid
            nextAniosSubini()
            let elem = $("#sel_subindi + span")
            focusShinyBorder(elem)
            console.log(anios_ids.value, "==", anios_txt.value)

        });

        $Anios.on("select2:unselect", (e) => {
            let anios_arr = getObjectSelect(Array.from($Anios[0].selectedOptions))
            anios_txt.value = (anios_arr.length == 0) ? "0" : anios_arr[anios_arr.length - 1][anios_arr.length - 1].acutext
            anios_ids.value = (anios_arr.length == 0) ? "0" : anios_arr[anios_arr.length - 1][anios_arr.length - 1].acuid
            nextAniosSubini()
            console.log(anios_ids.value, "==", anios_txt.value)
        });

        // ====================================================================================

        $Subindi.select2({
            placeholder: 'Seleccione Subindicadores',
            closeOnSelect: false,
        });

        $Subindi.on("select2:select", (e) => {

            let subindi_arr = getObjectSelect(Array.from($Subindi[0].selectedOptions))
            subindi_txt.value = subindi_arr[subindi_arr.length - 1][subindi_arr.length - 1].acutext
            subindi_ids.value = subindi_arr[subindi_arr.length - 1][subindi_arr.length - 1].acuid
            nextSubindiReporte()
            console.log(subindi_ids.value, "==", subindi_txt.value)

        });

        $Subindi.on("select2:unselect", (e) => {
            let subindi_arr = getObjectSelect(Array.from($Subindi[0].selectedOptions))
            subindi_txt.value = (subindi_arr.length == 0) ? "0" : subindi_arr[subindi_arr.length - 1][subindi_arr.length - 1].acutext
            subindi_ids.value = (subindi_arr.length == 0) ? "0" : subindi_arr[subindi_arr.length - 1][subindi_arr.length - 1].acuid
            nextSubindiReporte()
            console.log(subindi_ids.value, "==", subindi_txt.value)
        });


        // ====================================================================================

        $Columnas.select2({
            placeholder: 'Seleccione columnas para el reporte',
            closeOnSelect: false,
        });

        $Columnas.on("select2:select", (e) => {

            let columnas_arr = getObjectSelect(Array.from($Columnas[0].selectedOptions))
            columnas_txt.value = columnas_arr[columnas_arr.length - 1][columnas_arr.length - 1].acutext
            columnas_ids.value = columnas_arr[columnas_arr.length - 1][columnas_arr.length - 1].acuid
            nextSubindiReporte()
            console.log(columnas_ids.value, "==", columnas_txt.value)

        });

        $Columnas.on("select2:unselect", (e) => {
            let columnas_arr = getObjectSelect(Array.from($Columnas[0].selectedOptions))
            columnas_txt.value = (columnas_arr.length == 0) ? "0" : columnas_arr[columnas_arr.length - 1][columnas_arr.length - 1].acutext
            columnas_ids.value = (columnas_arr.length == 0) ? "0" : columnas_arr[columnas_arr.length - 1][columnas_arr.length - 1].acuid
            nextSubindiReporte()
            console.log(columnas_ids.value, "==", columnas_txt.value)
        });

        console.log("Otras Configuraciones")


    }    

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
                
                data.map(function (obj, i) {
                    $('#sel_temas').append('<option value="' + obj.Id + '">' + decodeURIComponent(escape(obj.ClassName)) +'</option>')
                })

                temas_ids.value = "0"
                console.log("ListTemas:", data)
                temas_data.value = JSON.stringify(data)
                localStorage.setItem("dbTemas", JSON.stringify(data))

            }
        });

    }

    // FIN DE CARGA DE DATOS INICIALES =============================================

    const getListActivos = async function() {

        await $.ajax({
            async: true,
            url: val_uri + 'ReportesASG/ActivosAll',
            data: {
                'num_query': '5',
                'id': '0',
                'str_id_emisores': '0'
            },
            type: 'GET',
            success: function (data) {

                data.unshift({ Id: 0, ClassName: "todos los Activos" })
                
                data.map(function (obj, i) {
                    $('#sel_activos').append('<option value="' + obj.Id + '">' + obj.ClassName + '</option>')
                })

                activos_ids.value = "0"
                //toastr.success("Lista de activos cargados.", "Reportes ASG");
                console.log("ListActivos:", data)
                activos_data.value = JSON.stringify(data)
                localStorage.setItem("dbActivos", JSON.stringify(data))

            }
        });

    }

    const getListEmisoras = async function () {

        await $.ajax({
            async: true,
            url: val_uri + 'ReportesASG/EmisorasAll',
            data: {
                'num_query': '3',
                'id': '0',
                'str_id_emisores': `Tipo_Emisor IN (${activos_ids.value})`
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

                emisoras_ids.value = "0"
                //toastr.success("Lista de emisoras cargadas.", "Reportes ASG");
                console.log("ListEmisoras:", data)
                emisoras_data.value = JSON.stringify(data)
                localStorage.setItem("dbEmisora", JSON.stringify(data))
            }
        });

    }

    const getListSectores = async function () {

        await $.ajax({
            async: true,
            url: val_uri + 'ReportesASG/SectoresAll',
            data: {
                'num_query': '6',
                'id': '0',
                'str_id_emisores': `And e.Emisor_Id IN (${emisoras_ids.value})`
            },
            type: 'GET',
            success: data => {

                data.unshift({ Id: 0, ClassName: "Todos los Sectores" })
                //this.sectores_data = data;

                data.map(function (obj, i) {
                    $('#sel_sector').append('<option value="' + obj.Id + '">' + obj.ClassName + '</option>')
                })

                sectores_ids.value = "0"
                //toastr.success("Lista de sectores cargados.", "Reportes ASG");
                console.log("ListSectores:", data)
                sectores_data.value = JSON.stringify(data)
                localStorage.setItem("dbSectores", JSON.stringify(data))
            }
        });

    }

    const getListAnios = async function () {

        let anios_dat = [
            { "id_anio": 2019, "anio": 2019 },
            { "id_anio": 2020, "anio": 2020 },
            { "id_anio": 2021, "anio": 2021 },
            { "id_anio": 2022, "anio": 2022 },
            { "id_anio": 2023, "anio": 2023 },
            { "id_anio": 2024, "anio": 2024 },
            { "id_anio": 2025, "anio": 2025 },
            { "id_anio": 2026, "anio": 2026 },
            { "id_anio": 2027, "anio": 2027 }
        ]

        anios_dat.map(function (obj, i) {
            $('#sel_anios').append('<option value="' + obj.id_anio + '">' + obj.anio + '</option>')
        })

        anios_ids.value = "0"
        //toastr.success("Lista de años cargados.", "Reportes ASG");
        console.log("ListAños", anios_dat)
        anios_data.value = JSON.stringify(anios_dat)
        localStorage.setItem("dbAnios", JSON.stringify(anios_dat))
    }

    const getDatosSubindicadores = async function () {

        if (temas_ids.value == "11" || temas_ids.value == "12") {

            await $.ajax({
                async: false,
                url: val_uri + `ReportesASG/SubIndicadoresAll`,
                data: {
                    'num_query': '7',
                    'id': '0',
                    'str_id_emisores': `${temas_ids.value}`
                },
                type: 'get',
                success: function (data) {

                    document.getElementById("sel_subindi").innerHTML = "";
                    data.unshift({ Id: 0, ClassName: "Todos los Subindicadores" })

                    data.map(function (obj, i) {
                        $('#sel_subindi').append('<option value="' + obj.Id + '">' + decodeURIComponent(escape(obj.ClassName)) + '</option>')
                    })
                    subindi_ids.value = "0"
                    //toastr.success("Lista de subindicadores cargados.", "Reportes ASG");
                    console.log("ListSubindicadores: ", data)
                    subindi_data.value = JSON.stringify(data)
                    localStorage.setItem("dbSubindi", JSON.stringify(data))
                },
                failure: function (fail) {
                    toastr.error(fail, "");
                },
                Error: function (er) {
                    toastr.error(er, "");
                }
            });
        } 

    }

    const getListColumnas = async function (data) {

        data.map(function (val, i) {
            $('#sel_columnas').append('<option value="' + i + '">' + val + '</option>')
        })

        console.log("ListColumnas", anios_data)
        columnas_data.value = JSON.stringify(data)
        localStorage.setItem("dbColumnas", JSON.stringify(data))
    }

    // wizard PARA LLENAR LOS COMBOS

    const nextTemasActivos = function () {

        //e.preventDefault()

        if (temas_ids.value == '') {
            toastr.warning("Necesita seleccionar un Tema.", "Reportes ASG");
            return;
        }

        $('#sel_subindi').empty()

        getDatosSubindicadores()
        subindi_ids.value = "0"

        data_tosend[0].temas = temas_ids
    }

    const nextActivosEmisoras = async function () {

        //e.preventDefault()

        if (activos_ids.value == "") {
            //toastr.warning("Necesita seleccionar uno o varios Activos.", "Reportes ASG");
            //return;
        }

        $('#sel_emisoras').empty()
        getListEmisoras()
        emisoras_ids.value = "0"

    }

    const nextEmisorasSectores = async function () {

        //e.preventDefault()

        if (emisoras_ids.value == "") {
            //toastr.warning("Necesita seleccionar una o varias Emisora.", "Reportes ASG");
            //return;
        }

        $('#sel_sector').empty()
        getListSectores()
        sectores_ids.value = "0"

    }

    const nextSectoresAnios = function () {

        //e.preventDefault()

        if (sectores_ids.value == "") {
            //toastr.warning("Necesita seleccionar un o varios Sectores.", "Reportes ASG");
            //return;
        }
        
        //$('#sel_anios').empty()
        //getListAnios()

    }

    const nextAniosSubini = function () {

        //e.preventDefault()

        //if (anios_ids.value == "") {
        //    toastr.warning("Necesita seleccionar un Año.", "Reportes ASG");
        //    return;
        //}

        //$('#sel_subindi').empty()
        //getDatosSubindicadores()

    }

    const nextSubindiReporte = function (e) {

        e.preventDefault()

        if (subindi_ids.value == "") {
            //toastr.warning("Necesita seleccionar uno o varios Subindicadores.", "Reportes ASG");
            return;
        }

        //document.querySelector("#genera_rep").disabled = false
        //document.querySelector("#genera_rep_din").disabled = false

    }

    // FUNCIONES PARA CARGAR LOS REPORTES
    
    const generarReporte = function (e) {

        e.preventDefault()

        $.ajax({
            async: false,
            //url: this.val_uri + `Survey/EMICamposReporteList?Id=1`,
            //url: val_uri + `ReportesASG/ReportDinamy?opciones=0&Temas=0&activo=0&emisor=0&sector=0&anio=2020&subindi=0`,
            url: val_uri + `ReportesASG/ReportDinamy?opciones=${temas_ids.value}&Temas=${temas_ids.value}&activo=${activos_ids.value}&emisor=${emisoras_ids.value}&sector=${sectores_ids.value}&anio=${anios_ids.value}&subindi=${subindi_ids.value}`,
            //url: this.val_uri + `Survey/RepPivotDinamico?Columnas=Emisor_Nombre,yearScoreAsg,Puntos_Cambio_climático&TipoColumnas=string,int,decimal&TipoReporte=1`,
            type: 'get',
            success: (data_response) => {

                if (data_response == null || data_response.Table.length == 0) {
                    toastr.success("No hay datos para esta consulta.", "ASG")
                    return
                }
                console.log("Reporte DataTable", data_response.Table)

                let bd, cols, tdato, etiquetas
                // array con los titulos[0], columnas[1], labels[2], tipo_dato[3] y datos[4]
                let datos = SanitizarDatosDT(data_response.Table)

                bd = datos[4]
                cols = datos[1]
                etiquetas = datos[0]

                console.log("Sanitizador:", datos)

                $('#table_id').DataTable().destroy()
                let tabla_din = document.querySelector('#table_id')
                console.log(tabla_din)
                tabla_din.childNodes[0].childNodes[0].remove()
                tabla_din.style.width = "2800px"

                dataTable(bd, cols, etiquetas).then(resp => {
                    toastr.success("Se ha creado el reporte solicitado.", "ASG")
                    $('#tabla_dinamica').hide()
                    $('#datatables').show(500)
                    window.location.href = "#MiDataTabla" 
                })

            }
        });

    }

    const dataTable = async function (data, columns, titles) {


        //this.dataTable = $('#table_id').DataTable({
        //    dom: 'Bfrtip',
        //    buttons: [
        //        'excel', 'copy'
        //    ],
        //    "pageLength": "100",
        //    "responsive": true,
        //    "columns": columns,
        //    "columnDefs": titles,
        //    "data": data,
        //})

    }

    // TABLAS DE KENDO TELERIK

    const generarReporteDin = function (e) {

        e.preventDefault()

        if (temas_ids.value == "0" || anios_ids.value == "0") {
            toastr.warning("Necesita seleccionar un Tema y año.", "Reportes ASG");
            return;
        }

        $('#modalwaitp').modal('show')

        let ajax_url
        if (demo_data.checked) {
            ajax_url = `ReportesASG/ReportDinamy?opciones=0&Temas=0&activo=0&emisor=0&sector=0&anio=2020&subindi=0`
        } else {
            //ajax_url = `ReportesASG/ReportDinamy?opciones=${temas_ids.value}&Temas=${temas_ids.value}&activo=${activos_ids.value}&emisor=${emisoras_ids.value}&sector=${sectores_ids.value}&anio=${anios_ids.value}&subindi=${subindi_ids.value}`
            ajax_url = "ReportesASG/ReportDinamy?opciones=" + temas_ids.value + "&Temas=" + temas_ids.value +
                "&activo=AND e.Tipo_Emisor IN (" + activos_ids.value + ")" +
                "&emisor=AND e.Emisor_Id IN (" + emisoras_ids.value + ")" +
                "&sector=AND ss.SessionSector_Sector_Id IN (" + sectores_ids.value + ")" +
                "&anio=" + anios_ids.value + "" +
                "&subindi=" + subindi_ids.value + ""      
        }

        $.ajax({

            async: false,
            //url: val_uri + `Survey/RepPivotDinamico?Columnas=Emisor_Nombre,yearScoreAsg,Puntos_Cambio_climático&TipoColumnas=string,int,decimal&TipoReporte=1`,
            url: val_uri + ajax_url,
            type: 'get',
            success: function (data_response) {

                if (data_response == null || data_response.Table.length == 0) {
                    toastr.warning("No hay datos para esta consulta.", "ASG")
                    $('#modalwaitp').modal('hide')
                    $('#tabla_dinamica').hide(500)
                    const Pivotgrid = document.querySelector('#pivotgrid')
                    const Configurator = document.querySelector('#configurator')
                    while (Pivotgrid.firstChild) {
                        Pivotgrid.removeChild(Pivotgrid.firstChild);
                    }
                    while (Configurator.firstChild) {
                        Configurator.removeChild(Configurator.firstChild);
                    }
                    return
                }
                console.log("Reporte Tabla Dinámica",data_response.Table)

                let bd, cols, tdato, etiquetas, datos

                // array con los titulos[0], columnas[1], labels[2], tipo_dato[3] y datos[4], cantidad_caracteres[5]
                datos = SanitizarDatosDT(data_response.Table)

                bd = datos[4]
                cols = datos[2]
                tdato = datos[3]
                etiquetas = datos[2]

                console.log("Sanitizador", datos)

                $('#sel_columnas').empty()
                getListColumnas(cols)

                const Pivotgrid = document.querySelector('#pivotgrid')
                const Configurator = document.querySelector('#configurator')

                while (Pivotgrid.firstChild) {
                    Pivotgrid.removeChild(Pivotgrid.firstChild);
                }
                while (Configurator.firstChild) {
                    Configurator.removeChild(Configurator.firstChild);
                }


                // enviar data, campos, tipo_dato, etiquetas
                pivotGrid(bd, cols, tdato, etiquetas).then(resp => {
                    toastr.success("Se ha creado el reporte solicitado.", "ASG")
                    $('#modalwaitp').modal('hide')
                    $('#datatablesKg').hide()
                    $('#tabla_dinamica').show(500)
                    window.scroll({
                        top: 532,
                        behavior: "smooth"
                    });

                })
            }

        });


    }

    jq31 = jQuery.noConflict(true)
    const pivotGrid = async function (data, str_campos_arr, str_tdato_arr, str_etiqueta_arr) {

        // fields ======================================================================

        let obj_string = "";
        str_tdato_arr.forEach(function (element, i) {
            element = (element == 'int' || element == 'decimal') ? 'number' : 'string'
            obj_string += `"${str_campos_arr[i]}":{"type":"${element}"},`
        })

        obj_string = obj_string.substring(0, (obj_string.length - 1))
        obj_string = "{" + obj_string + "}"

        let obj_fields = ""
        obj_fields = `{"dimensions": ${obj_string} }`
        obj_fields = JSON.parse(obj_fields)
        console.log("fields: ", obj_fields)
        // END fields ==================================================================

        // DIMENSIONS ======================================================================
        let dim_string = "";

        str_campos_arr.forEach(function (element, i) {
            dim_string += `"${element}":{"caption":"${str_etiqueta_arr[i]}"},`
        })

        dim_string = dim_string.substring(0, (dim_string.length - 1))
        dim_string = "{" + dim_string + "}"

        let obj_dimension = `"dimensions": ${dim_string}`

        // DIMENSIONS ======================================================================

        // MEASURES ======================================================================
        let mes_string = "";
        let mes_sumstr = "";
        str_campos_arr.forEach(function (element, i) {
            if (str_tdato_arr[i] == "decimal" || str_tdato_arr[i] == "int" || str_tdato_arr[i] == "number") {
                mes_string += `"Avg ${str_etiqueta_arr[i]}":{"field":"${element}","format":"{0:n}","aggregate":"average" },`
                mes_string += `"Sum ${str_etiqueta_arr[i]}":{"field":"${element}","format":"{0:n}","aggregate":"sum" },`
            }
        })

        mes_string = mes_string.substring(0, (mes_string.length - 1))
        mes_string = "{" + mes_string + "}"

        let obj_measure = `"measures": ${mes_string}`
        //obj_dimension = JSON.parse(obj_dimension)

        // MEASURES ======================================================================
        let obj_cube = `{${obj_dimension},${obj_measure}}`
        obj_cube = JSON.parse(obj_cube)

        console.log("cube:", obj_cube)


        const pivotgrid = jq31("#pivotgrid").kendoPivotGrid({

            filterable: true,
            sortable: true,
            excel: {
                fileName: "Reportes ASG.xlsx",
                proxyURL: "https://demos.telerik.com/kendo-ui/service/export",
                filterable: true
            },
            dataSource: {
                data: data,
                schema: {
                    model: obj_fields,
                    cube: obj_cube
                }
            }
        }).data("kendoPivotGrid");

        jq31("#configurator").kendoPivotConfigurator({
            dataSource: pivotgrid.dataSource,
            filterable: true,
            sortable: true,
            height: 520
        });

        jq31("#export").kendoButton({
            icon: "file-xls",
            click: function () {
                pivotgrid.saveAsExcel();
            }
        });



    }

    const generaReporteGK = async function (e) {

        e.preventDefault()

        if (temas_ids.value == "0" || anios_ids.value == "0") {
            toastr.warning("Necesita seleccionar un Tema y año.", "Reportes ASG");
            return;
        }

        $('#modalwaitp').modal('show')

        let ajax_url
        if (demo_data.checked) {
            ajax_url = `ReportesASG/ReportDinamy?opciones=0&Temas=0&activo=0&emisor=0&sector=0&anio=2020&subindi=0`
        } else {
            ajax_url = "ReportesASG/ReportDinamy?opciones="+temas_ids.value+"&Temas="+temas_ids.value +
                "&activo=AND e.Tipo_Emisor IN (" + activos_ids.value + ")" +
                "&emisor=AND e.Emisor_Id IN (" + emisoras_ids.value + ")" +
                "&sector=AND ss.SessionSector_Sector_Id IN ("  + sectores_ids.value + ")" +
                "&anio=" + anios_ids.value + "" +
                "&subindi=" + subindi_ids.value + ""
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

                if (temas_ids.value == 7) {
                    reporteTipoFichaTecnica(data_response)
                } else {
                    reporteTipoGeneral(data_response)
                }

            }

        });

}

    const reporteTipoFichaTecnica = async function (data_response) {

        let bd, cols, tdato, etiquetas, datos, columnas

        let num_tables = Object.keys(data_response).length
        let nom_object = Object.keys(data_response)

        for (let i = 0; i < num_tables; i++) {


            let nombre_tabla = nom_object[i]
            datos = SanitizarDatosDT(data_response[nombre_tabla])

            bd = datos[4]
            cols = datos[2]
            tdato = datos[3]
            size_pixel = datos[5]

            console.log("Sanitizador", datos)

            $('#sel_columnas').empty()
            getListColumnas(cols)

            if (i == 0) { i = "" }

            const grid_kendo = document.querySelector('#grid' + i)
            while (grid_kendo.firstChild) {
                grid_kendo.removeChild(grid_kendo.firstChild);
            }

            gridKendo(bd, cols, tdato, size_pixel, "#grid" + i).then()

            if (i == "") {
                $('#modalwaitp').modal('hide')
                $('#content_tabs_7').show()

                toastr.success("Se ha creado el reporte solicitado.", "ASG")
                $('#datatablesKg').css('height', '750px')
                $('#datatablesKg').show()
                $('#tabla_dinamica').hide(500)
                window.scroll({
                    top: 532,
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
                i = 0
            }


        } 


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

        $('#sel_columnas').empty()
        getListColumnas(cols)

        const grid_kendo = document.querySelector('#grid')

        while (grid_kendo.firstChild) { grid_kendo.removeChild(grid_kendo.firstChild); }

        gridKendo(bd, cols, tdato, size_pixel, '#grid').then(resp => {
            $('#modalwaitp').modal('hide')
            $('#content_tabs_7').hide()
            $('#datatablesKg').css('height', '600px')
            toastr.success("Se ha creado el reporte solicitado.", "ASG")
            $('#datatablesKg').show()
            $('#tabla_dinamica').hide(500)
            window.scroll({
                top: 532,
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
        console.log("obj_fields: ", obj_fields)
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

            fields_width += `{"field": "${field}", "width": "${ancho }"},`
        })

        fields_width = fields_width.substring(0, (fields_width.length - 1))
        fields_width = "[" + fields_width + "]"
        fields_width = JSON.parse(fields_width)

        console.log("fields_width", fields_width)

        // END ANCHO COLUMNAS  ==================================================================

        jq31(nom_table).kendoGrid({
            toolbar: ["excel", "search"],
            excel: {
                fileName: temas_txt.value + "_Reporte ASG.xlsx",
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
            resizable: true,
            filterable: true,
            pageable: {
                input: true,
                numeric: false
            },
            height: 550,
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

    // FUNCIONES GENERALES

    const focusShinyBorder = (ele) => {

        ele.addClass('shiny-box')
        setTimeout(function () {
            ele.removeClass('shiny-box', 1500)
        }, 3000);

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
                    nrow[labelspg[i]] = "ND"
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
