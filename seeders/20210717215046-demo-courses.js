'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Courses', [
        {   
            "id": 1,
            "title": "Build a Basic Bookcase",
            "description": "High-end furniture projects are great to dream about. But unless you have a well-equipped shop and some serious woodworking experience to draw on, it can be difficult to turn the dream into a reality.\n\nNot every piece of furniture needs to be a museum showpiece, though. Often a simple design does the job just as well and the experience gained in completing it goes a long way toward making the next project even better.\n\nOur pine bookcase, for example, features simple construction and it's designed to be built with basic woodworking tools. Yet, the finished project is a worthy and useful addition to any room of the house. While it's meant to rest on the floor, you can convert the bookcase to a wall-mounted storage unit by leaving off the baseboard. You can secure the cabinet to the wall by screwing through the cabinet cleats into the wall studs.\n\nWe made the case out of materials available at most building-supply dealers and lumberyards, including 1/2 x 3/4-in. parting strip, 1 x 2, 1 x 4 and 1 x 10 common pine and 1/4-in.-thick lauan plywood. Assembly is quick and easy with glue and nails, and when you're done with construction you have the option of a painted or clear finish.\n\nAs for basic tools, you'll need a portable circular saw, hammer, block plane, combination square, tape measure, metal rule, two clamps, nail set and putty knife. Other supplies include glue, nails, sandpaper, wood filler and varnish or paint and shellac.\n\nThe specifications that follow will produce a bookcase with overall dimensions of 10 3/4 in. deep x 34 in. wide x 48 in. tall. While the depth of the case is directly tied to the 1 x 10 stock, you can vary the height, width and shelf spacing to suit your needs. Keep in mind, though, that extending the width of the cabinet may require the addition of central shelf supports.",
            "estimatedTime": "12 hours",
            "materialsNeeded": "* 1/2 x 3/4 inch parting strip\n* 1 x 2 common pine\n* 1 x 4 common pine\n* 1 x 10 common pine\n* 1/4 inch thick lauan plywood\n* Finishing Nails\n* Sandpaper\n* Wood Glue\n* Wood Filler\n* Minwax Oil Based Polyurethane\n",
            createdAt: new Date(),
            updatedAt: new Date(),
            "userId": 1
          },
          {
            "id": 2,
            "title": "Learn How to Program",
            "description": "In this course, you'll learn how to write code like a pro!",
            "estimatedTime": "6 hours",
            "materialsNeeded": "* Notebook computer running Mac OS X or Windows\n* Text editor",
            createdAt: new Date(),
            updatedAt: new Date(),
            "userId": 2
          },
          { 
            "id": 3,
            "title": "Learn How to Test Programs",
            "description": "In this course, you'll learn how to test programs.",
            createdAt: new Date(),
            updatedAt: new Date(),
            "userId": 2
          },
          { 
            "id": 4,
            "title": "Debugging 101",
            "description": "An introduction to testing and debugging your code.",
            "estimatedTime": "4 hours",
            "materialsNeeded": "* Notebook computer running Mac OS X or Windows\n* Text editor",
            createdAt: new Date(),
            updatedAt: new Date(),
            "userId": 1
          }
  ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Courses', null, {});
  }
};