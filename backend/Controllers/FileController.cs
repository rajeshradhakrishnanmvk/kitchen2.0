using backend.Extensions;
using backend.Service;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace backend.Controllers
{
    [ExceptionHandler]
    [Route("file")]
    public class FileController : Controller
    {
        private readonly IAuthService service;

        public FileController()
        {
            //this.service = _service;
        }

        [HttpPost]
        [Route("uploadfile")]
        public async Task<IActionResult> UploadFile()
        {
             var formCollection = await Request.ReadFormAsync();
            var files = formCollection.Files;
            foreach (var file in files)
            {
                //file.FileName
                //file.ContentType
                //file.OpenReadStream()

            }

            return Ok();
        }

    }
}