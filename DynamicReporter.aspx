<%@ Page Title="Reporte Dinámico" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="DynamicReporter.aspx.cs" Inherits="ContractManagement.DynamicReporter" %>
<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">

    <style>
        .cuadros{
            background-color: white; 
            height:240px; 
            overflow:auto;
            border:1px solid silver;
        }

        .consola{
            margin-left:15px;
            border:0px none white;
            background-color: white;
            width:93%;
            font-size:11px !important;
            font-family:Consolas;
        }
        .consola:focus{
            margin-left:15px;
            border:0px none white;
            background-color: white;
            width:93%;
            font-size:11px !important;
            font-family:Consolas;
        }

        .controls{
            font-size:10px !important;
        }

        .k-master-row, .k-input-inner, .k-header, .k-button{
            font-size:10px !important;
        }
    </style>

     <webopt:BundleReference runat="server" Path="~/Content/Toastr" /> 
     <%--<webopt:BundleReference runat="server" Path="~/Content/jsTree" />--%>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jstree/3.2.1/themes/default/style.min.css" />
    <link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css" rel="stylesheet" />

    <asp:PlaceHolder runat="server">
        <%--<%: Scripts.Render("~/plugins/jsTree") %>--%>
        <%: Scripts.Render("~/plugins/toastrScript") %>
    </asp:PlaceHolder>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jstree/3.2.1/jstree.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script>

    <link href="http://kendo.cdn.telerik.com/2022.1.412/styles/kendo.common.min.css" rel="stylesheet" />
    <link href="http://kendo.cdn.telerik.com/2022.1.412/styles/kendo.default.min.css" rel="stylesheet" />
    <link href="http://kendo.cdn.telerik.com/2022.1.412/styles/kendo.default.mobile.min.css" rel="stylesheet" />

    <script src="http://kendo.cdn.telerik.com/2022.1.412/js/jquery.min.js"></script>
    <script src="http://kendo.cdn.telerik.com/2022.1.412/js/kendo.all.min.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/jszip/2.4.0/jszip.min.js"></script>

    <%--============================================================================================================================--%>

    <input ref="uri_val" type="hidden" name="hdfUri" id="hdfUri" runat="server" uri-trg="r" />
    <input type="hidden" name="hdfIdUsuario" id="hdfIdUsuario" runat="server" prm-u="usr" />

    <input type="hidden" id="emisoras_data" value="0" />
    <input type="hidden" id="emisoras_arr" value="0" />
    <input type="hidden" id="emisoras_ids" value="0" />
    <input type="hidden" id="emisoras_txt" value="0" />

    <input type="hidden" id="anios_data" value="0" />
    <input type="hidden" id="anios_ids" value="0" />
    <input type="hidden" id="anios_arr" value="0" />
    <input type="hidden" id="anios_txt" value="0" />

    <div class="row">
        <div class="col-lg-12" style="height:370px; width:100%; margin:0;">
            <div id="grid"></div>
        </div>
    </div>
    <div class="row" style="height:240px; width:100%; margin:0;">
        <div class="col-lg-4 cuadros">
            <div id="tree_temas"></div>
        </div>
        <div class="col-lg-4 cuadros">
            <input id="tree_temas_cols_loaded" type="hidden" value="0" />
            <div id="tree_temas_cols"></div>
        </div>
        <div class="col-lg-4 cuadros">
            <br />
            <div class="row">
                <div class="col-lg-12 form-group">
                    <label for="sel_anios">Años:</label>
                    <select id="sel_anios" class="js-example-basic-multiple js-states" multiple="multiple" style="width: 100%">
                    </select>
                </div>
                <div class="col-lg-12 form-group">
                    <label for="sel_emisoras">Emisoras:</label>
                    <select id="sel_emisoras" class="js-example-basic-multiple js-states" multiple="multiple" style="width: 100%">
                    </select>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-6 form-group">
                    <button type="button" id="crear_tabla">Generar Reporte</button>
                </div>
            </div>
            <div class="row">
                <input type="hidden" id="name_reporte" name="name_reporte" value="" /> 
                <input type="hidden" id="id_reporte" name="id_reporte" value="" />
            </div>
            <div class="row">
                <%--<textarea id="columnas" name="columnas" class="consola"  rows="3"></textarea>--%>
                <input type="hidden" id="columnas" name="columnas" class="consola" />
                <input type="hidden" id="columnas_id" name="columnas_id" class="consola" />
            </div>
            <div class="row">
                <input type="hidden" id="filtro_emisora" name="filtro_emisora" class="consola"  value="" />
                <input type="hidden" id="filtro_anio" name="filtro_anio" class="consola"  value="" />
                <input type="hidden" id="filtro_emisora_id" name="filtro_emisora" class="consola"  value="" />
            </div>
        </div>
    </div>

    <asp:PlaceHolder runat="server">
        <%: Scripts.Render("~/plugins/DynamicReporter") %> 
    </asp:PlaceHolder>

</asp:Content>
