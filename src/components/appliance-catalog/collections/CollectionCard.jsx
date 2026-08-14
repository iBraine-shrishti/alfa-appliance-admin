// import { Link } from "react-router-dom";
// import { FiArrowRight } from "react-icons/fi";

// const CollectionCard = ({ collection }) => {
//   return (
//     <Link
//       to={`/admin/appliance-catalog/collections/${collection.slug}`}
//       className="rounded border border-slate-200 bg-white p-6 transition-colors hover:border-blue-200"
//     >
//       <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-xl bg-slate-100">
//         <img
//           src={collection.image}
//           alt={collection.title}
//           className="h-full w-full object-cover"
//         />
//       </div>

//       <h3 className="mt-5 text-base font-bold text-navy-950">{collection.title}</h3>

//       <div className="mt-1 flex items-center justify-between">
//         <p className="text-sm text-slate-400">{collection.productCount} Products</p>
//         <FiArrowRight size={15} className="text-slate-300" />
//       </div>
//     </Link>
//   );
// };

// export default CollectionCard;


import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

const CollectionCard = ({ collection }) => {
  return (
    <Link
      to={`/admin/appliance-catalog/collections/${collection.slug}`}
      className="
        group
        relative
        block
        rounded
        border
        border-slate-200
        bg-white
        p-5
        transition-all
        duration-300
        ease-out
        hover:-translate-y-1
        hover:scale-[1.02]
        hover:border-blue-200
        hover:shadow-lg
      "
    >
      {/* Image */}
      <div
        className="
          flex
          h-24
          w-24
          items-center
          justify-center
          overflow-hidden
          rounded
          bg-slate-100
          transition-transform
          duration-300
          group-hover:scale-105
        "
      >
        <img
          src={collection.image}
          alt={collection.title}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="mt-5">
        <h3
          className="
            text-base
            font-bold
            text-navy-950
            transition-colors
            duration-300
            group-hover:text-[#1D60FF]
          "
        >
          {collection.title}
        </h3>

        <div className="mt-1.5 flex items-center justify-between">
          <p className="text-sm text-slate-400">
            {collection.productCount} Products
          </p>

          <span
            className="
              flex
              h-7
              w-7
              items-center
              justify-center
              rounded-full
              text-slate-300
              transition-all
              duration-300
              group-hover:bg-[#EAF0FF]
              group-hover:text-[#1D60FF]
              group-hover:translate-x-1
            "
          >
            <FiArrowRight size={15} />
          </span>
        </div>
      </div>
    </Link>
  );
};

export default CollectionCard;