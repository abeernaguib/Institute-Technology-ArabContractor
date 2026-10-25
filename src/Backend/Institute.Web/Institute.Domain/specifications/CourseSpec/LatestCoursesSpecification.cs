using Institute.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Institute.Domain.specifications.CourseSpec
{
    public class LatestCoursesSpecification : BaseSpecification<Planwork>
    {
        // A "course" = not flagged as a section and has no children.
        // It no longer depends on CourseDate / CourseDesc, so a course with
        // no rounds (null date) still shows up.
        public LatestCoursesSpecification(int takeCount)
            : base(p => p.DetailsFlag != true && !p.Children.Any())
        {
            // newest added first (CourseDate is a string and is null for courses without rounds)
            AddOrderByDescending(p => p.ChildId);
            ApplyPaging(0, takeCount);
        }
    }
}