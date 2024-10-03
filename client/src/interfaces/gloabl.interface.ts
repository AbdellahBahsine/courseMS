interface courseObject {
    _id: string;
    title: string;
    description: string;
    instructor: string;
    schedule: string;
};

interface CourseProps {
    course: courseObject;
}

interface newCourseObject {
    title: string;
    description: string;
    schedule: string;
}

interface filtersObject {
    title?: string;
    instructor?: string;
}
  
interface FilterProps {
    isFiltersOpen: boolean;
    setIsFiltersOpen: React.Dispatch<React.SetStateAction<boolean>>;
    filters: filtersObject;
    setFilters: React.Dispatch<React.SetStateAction<filtersObject>>;
    setFiltersApplied:(boolean : boolean) => void;
}

interface SearchProps {
    setSearchVisible: (boolean : boolean) => void;
}