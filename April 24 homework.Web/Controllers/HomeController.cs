using April_24.Data;
using April_24_homework.Web.Models;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace April_24_homework.Web.Controllers
{
    public class HomeController : Controller
    {
        private string _connectionString = @"Data Source=.\sqlexpress;Initial Catalog=People;Integrated Security=true;";

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult GetPeople()
        {
            PeopleRepo repo = new(_connectionString);
            List<Person> people = repo.GetAll();
            return Json(people);
        }

        public void AddPerson(Person p)
        {
            PeopleRepo repo = new(_connectionString);
            repo.AddPerson(p);
        }

        public void EditPerson(Person p)
        {
            PeopleRepo repo = new(_connectionString);
            repo.EditPerson(p);
        }

        public IActionResult GetPerson(int id)
        {
            PeopleRepo repo = new(_connectionString);
            Person p = repo.GetPersonById(id);
            return Json(p);
        }

        public void DeletePerson(int id)
        {
            PeopleRepo repo = new(_connectionString);
            repo.DeletePerson(id);
        }
    }
}