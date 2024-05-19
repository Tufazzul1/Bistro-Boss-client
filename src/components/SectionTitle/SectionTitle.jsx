

const SectionTitle = ({heading , subHeading}) => {
    return (
        <div className="text-center my-8 w-4/12 mx-auto">
            <p className="text-yellow-600 mb-2">---{subHeading}---</p>
            <h3 className="texl-xl md:text-3xl uppercase border-y-4 py-4">{heading}</h3>
        </div>
    );
};

export default SectionTitle;