<%@ Page Title="Reporteador ASG" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="ReporteadorASG.aspx.cs" Inherits="ContractManagement.ReporteadorASG" %>
<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">

    <%--ESTILOS ====================================================================================================--%>
    <link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css" rel="stylesheet" />
    <webopt:BundleReference runat="server" Path="~/Content/Toastr" /> 

<%--    <link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css" rel="stylesheet" />
    <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.12.0/css/jquery.dataTables.css"> 
    <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/buttons/2.2.3/css/buttons.dataTables.min.css"> --%>

    <%--SCRIPTS ====================================================================================================--%>
    <asp:PlaceHolder runat="server">
        <%: Scripts.Render("~/plugins/toastrScript") %>
    </asp:PlaceHolder>
    <script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script>

<%--    <script type="text/javascript" charset="utf8" src="https://cdn.datatables.net/1.12.0/js/jquery.dataTables.js"></script>
    <script type="text/javascript" charset="utf8" src="https://cdn.datatables.net/buttons/2.2.3/js/dataTables.buttons.min.js"></script> 
    <script type="text/javascript" charset="utf8" src="https://cdn.datatables.net/buttons/2.2.3/js/buttons.html5.min.js"></script> --%>    
    
    <link href="http://kendo.cdn.telerik.com/2022.1.412/styles/kendo.common.min.css" rel="stylesheet" />
    <link href="http://kendo.cdn.telerik.com/2022.1.412/styles/kendo.default.min.css" rel="stylesheet" />
    <link href="http://kendo.cdn.telerik.com/2022.1.412/styles/kendo.default.mobile.min.css" rel="stylesheet" />

    <script src="http://kendo.cdn.telerik.com/2022.1.412/js/jquery.min.js"></script>
    <script src="http://kendo.cdn.telerik.com/2022.1.412/js/kendo.all.min.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/jszip/2.4.0/jszip.min.js"></script>

<%--    <script src="http://demos.telerik.com/kendo-ui/content/shared/js/products.js"></script>--%>

     <style>
        .box-shadow {
            box-shadow:  2px 3px 10px 0px rgba(0,0,0,0.25);
            border-radius: 3px;
            background-color: white;
        }

        .btn-size {
            width: 90px;
            height: 33px;
        }

        .oculto { 
            visibility:hidden;
        }

        .shiny-box { 
              box-shadow: 0px 0px 10px #84ffff;
              border-radius: 3px;
              border: 1px solid #00e5ff;
        }
    </style>

    
    <div class="row wrapper border-bottom white-bg page-heading m-b height-head">
        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 new-p-r">
            <h2>Reportes ASG</h2>
            <input ref="uri_val" type="hidden" name="hdfUri" id="hdfUri" runat="server" uri-trg="r" />
            <input type="hidden" name="hdfIdUsuario" id="hdfIdUsuario" runat="server" prm-u="usr" />
        </div>
    </div>


    <div class="content-fluid box-shadow animacion content-select m-t-sm" style="padding: 15px; height:350px; overflow:auto;">

        <div class="container-fluid m-t-md">

            <div class="row">

                <div class="col-sm-6">

                    <div id="seleccionados" class="row">

                        <input type="hidden" id="temas_data" value="0" />
                        <input type="hidden" id="temas_arr" value="0" />
                        <input type="hidden" id="temas_ids" value="0" />
                        <input type="hidden" id="temas_txt" value="0" />
                        <input type="hidden" id="activos_data" value="0" />
                        <input type="hidden" id="activos_arr" value="0" />
                        <input type="hidden" id="activos_ids" value="0" />
                        <input type="hidden" id="activos_txt" value="0" />
                        <input type="hidden" id="emisoras_data" value="0" />
                        <input type="hidden" id="emisoras_arr" value="0" />
                        <input type="hidden" id="emisoras_ids" value="0" />
                        <input type="hidden" id="emisoras_txt" value="0" />
                        <input type="hidden" id="sectores_data" value="0" />
                        <input type="hidden" id="sectores_arr" value="0" />
                        <input type="hidden" id="sectores_ids" value="0" />
                        <input type="hidden" id="sectores_txt" value="0" />
                        <input type="hidden" id="anios_data" value="0" />
                        <input type="hidden" id="anios_ids" value="0" />
                        <input type="hidden" id="anios_arr" value="0" />
                        <input type="hidden" id="anios_txt" value="0" />
                        <input type="hidden" id="subindi_arr" value="0" />
                        <input type="hidden" id="subindi_ids" value="0" />
                        <input type="hidden" id="subindi_txt" value="0" />
                        <input type="hidden" id="subindi_data" value="0" />
                        <input type="hidden" id="columnas_data" value="0" />
                        <input type="hidden" id="columnas_ids" value="0" />
                        <input type="hidden" id="columnas_arr" value="0" />
                        <input type="hidden" id="columnas_txt" value="0" />

                    </div>

                    <div class="row" id="activos">

                        <div class="col-lg-12 form-group">
                            <label for="sel_temas">Temas:</label>
                            <select id="sel_temas" class="js-example-basic-multiple  js-states form-control" style="width: 100%" multiple="multiple">
                            </select>
                        </div>

                        <div class="col-lg-12 form-group">
                            <label for="sel_emisoras">Emisoras:</label>
                            <select id="sel_emisoras" class="js-example-basic-multiple  js-states form-control" style="width: 100%" multiple="multiple">
                            </select>
                        </div>

                        <div class="col-lg-12 form-group">
                            <label for="sel_anios">Años:</label>
                            <select id="sel_anios" class="js-example-basic-multiple  js-states form-control" style="width: 100%" multiple="multiple">
                            </select>
                        </div>

                    </div>

                    <div class="row">

                        <div class="col-sm-3 btn-gen-reporte">
                            <button id="genera_rep" class="btn btn-mutted">Generar Reporte</button>
                        </div>

                        <div class="col-sm-3 btn-gen-reporte">
                            <button id="genera_rep_din" class="btn btn-mutted">Tabla Dinamica</button>
                        </div>

                        <div class="col-sm-3 checkbox" style="display:none">
                            <label>
                                <input id="demo_data" type="checkbox">
                            </label>
                        </div>

                    </div>

                </div>

                <div class="col-sm-6">

                    <div class="row">

                        <div class="col-lg-12 form-group">
                            <label for="sel_activos">Activos</label>
                            <select id="sel_activos" class="js-example-basic-multiple  js-states form-control" style="width: 100%" multiple="multiple">
                            </select>
                        </div>   

                        <div class="col-lg-12 form-group">
                            <label for="sel_sector">Sectores:</label>
                            <select id="sel_sector" class="js-example-basic-multiple  js-states form-control" style="width: 100%" multiple="multiple">
                            </select>
                        </div>

                        <div class="col-lg-12 form-group">
                            <label for="sel_subindi">Subindicadores:</label>
                            <select id="sel_subindi" class="js-example-basic-multiple  js-states form-control" style="width: 100%" multiple="multiple">
                            </select>
                        </div>

                    </div>

                    <div class="row" style="display:none">
                        <div class="col-lg-12 form-group">
                            <label for="sel_columnas">Campos Disponibles:</label>
                            <select id="sel_columnas" class="js-example-basic-multiple  js-states form-control" style="width: 100%" multiple="multiple">
                            </select>
                        </div>
                    </div>

                </div>

            </div>
            
        </div>

    </div>

    <%-- ################### DATATABLE ####################################--%>

    <div id="datatables" class="box-shadow m-t-lg responsive" style="padding: 15px; display:none;">
        <div id="MiDataTabla"></div>
        <div class="table-responsive" style="height: 480px;">
            <table id="table_id" class="display"><thead></thead><tbody></tbody></table> 
        </div>
    </div>
        
    <%-- ################### END DATATABLE #################################--%>

    <%-- ################### GRID KENDO #################################--%>

    <div id="datatablesKg" class="content-fluid box-shadow m-t-lg" style="display:none; padding: 15px; height:600px; overflow-x:auto;">
        <div id="grid"></div>

        <br />
        
        <div id="content_tabs_7" class="tabs-container ibox" style="background-color:white;">
            <div class="ibox-content">
                <ul class="nav nav-tabs" id="tabsD">
                    <li class="active"><a href="#tab1" data-toggle="tab" aria-expanded="false">Proyectos por emisora</a></li>
                    <li class=""><a href="#tab2" data-toggle="tab" aria-expanded="false">Proyectos por sector</a></li>
                    <li class=""><a href="#tab3" data-toggle="tab" aria-expanded="false">Categoria de inversión sustentable</a></li>
                    <li class=""><a href="#tab4" data-toggle="tab" aria-expanded="false">Categoria de inversión sustentable monto</a></li>
                    <li class=""><a href="#tab5" data-toggle="tab" aria-expanded="false">Categoría de temas</a></li>
                </ul>

                <div class="tab-content" id="contentHdr">
                    <div class="tab-pane active" id="tab1">
                        <div id="grid1"></div>
                    </div>
                    <div class="tab-pane" id="tab2">
                        <div id="grid2"></div>
                    </div>
                    <div class="tab-pane" id="tab3">
                        <div id="grid3"></div>
                    </div>
                    <div class="tab-pane" id="tab4">
                        <div id="grid4"></div>
                    </div>
                    <div class="tab-pane" id="tab5">
                        <div id="grid5"></div>
                    </div>
                </div>
            </div>
        </div>

        <style>

            #grid .k-grid-content
            {
                min-height: 200px;
                max-height: 550px;
            }

        </style>
    </div>

    <%-- ################### END GRID KENDO ################################--%>

    <%-- ################### TABLA DINAMICA ################################--%>

    <div id="tabla_dinamica" class="content-fluid box-shadow m-t-lg" style="padding: 15px; display:none;">
        <div id="MiTablaDinamica"></div>
        <div id="example" class="table-responsive">
            <button id="export" class="hidden-on-narrow">Export a Excel</button>
            <div class="k-pivotgrid-wrapper">
                <div id="configurator" class="hidden-on-narrow"></div>
                <div id="pivotgrid" class="hidden-on-narrow"></div>
            </div>
        </div>

        <div class="responsive-message"></div>
        <div id="dvUsrs"></div>
    </div>

    <%-- ################### END TABLA DINAMICA ############################--%>

    <asp:PlaceHolder runat="server">
        <%: Scripts.Render("~/plugins/ReporteadorASG") %>         
    </asp:PlaceHolder>

</asp:Content>