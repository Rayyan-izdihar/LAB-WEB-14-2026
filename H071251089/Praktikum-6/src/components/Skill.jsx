function Skill() {
    
    const skills = [
        { id: 1, skill: "HTML & CSS" }, 
        { id: 2, skill: "JavaScript" }, 
        { id: 3, skill: "React" }, 
        { id: 4, skill: "PostreSQL" }, 
        { id: 5, skill: "Python" }, 
        { id: 6, skill: "PHP" },
        { id: 7, skill: "Java" },
        { id: 8, skill: "Git & GitHub "}
    ]

    return (
        <div id="skill" className="text-ink px-5 pt-32">
            <div className="bg-sage-dark rounded-[2rem] p-6 md:p-10">
                <h2 className="text-2xl text-cream font-bold">Keahlian</h2>

                <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 text-base md:text-lg">
                    {skills.map((item) => (
                        <div key={item.id} className="flex gap-3 items-center bg-cream rounded-full px-4 py-3 transition hover:bg-sage hover:-translate-y-1 duration-200">
                            <span className="grid text-white bg-clay rounded-full font-bold w-9 h-9 place-items-center">{item.id}</span>
                            <span className="text-ink font-medium">{item.skill}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Skill