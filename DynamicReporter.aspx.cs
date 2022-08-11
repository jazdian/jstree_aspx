using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Entidades;

namespace ContractManagement
{
    public partial class DynamicReporter : System.Web.UI.Page
    {
        static System.Resources.ResourceManager rm = new System.Resources.ResourceManager("ContractManagement.Resource1", System.Reflection.Assembly.GetExecutingAssembly());
        static string urlApi = rm.GetString("UrlWebApi", System.Globalization.CultureInfo.CurrentCulture);
        protected void Page_Load(object sender, EventArgs e)
        {
            try
            {
                urlApi = System.Configuration.ConfigurationManager.AppSettings["UriApi"];
                hdfUri.Value = urlApi;
                Usuario usuario = new Usuario();
                usuario = (Usuario)Session["User"];
                hdfIdUsuario.Value = usuario.Id.ToString();
            }
            catch (Exception ex)
            {
                Response.Redirect("Logout.aspx");
            }
        }
    }
}