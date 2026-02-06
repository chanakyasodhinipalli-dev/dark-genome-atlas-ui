import type { UIAction } from "@/types";

interface ActionButtonProps {
  action: UIAction;
}

export function ActionButton({ action }: ActionButtonProps) {
  const handleClick = () => {
    switch (action.type) {
      case "view_3d_structure":
        console.log("View 3D structure:", action.payload);
        // TODO: Implement 3D structure viewer
        alert("3D structure viewer not yet implemented");
        break;

      case "compare_structures":
        console.log("Compare structures:", action.payload);
        // TODO: Implement structure comparison
        alert("Structure comparison not yet implemented");
        break;

      case "explore_similar":
        console.log("Explore similar proteins:", action.payload);
        // TODO: Implement similar protein exploration
        alert("Similar protein exploration not yet implemented");
        break;

      case "export_data":
        console.log("Export data:", action.payload);
        // TODO: Implement data export
        alert("Data export not yet implemented");
        break;

      case "external_link":
        if (action.payload.url) {
          window.open(action.payload.url as string, "_blank");
        }
        break;

      case "search_mutations":
        console.log("Search mutations:", action.payload);
        // TODO: Implement mutation search
        alert("Mutation search not yet implemented");
        break;

      case "download_local_pdb":
        if (action.payload.pdb_url) {
          window.open(action.payload.pdb_url as string, "_blank");
        }
        break;

      case "view_local_structure":
        if (action.payload.image_url) {
          window.open(action.payload.image_url as string, "_blank");
        }
        break;

      default:
        console.log("Unknown action type:", action.type);
    }
  };

  const getButtonColor = () => {
    switch (action.type) {
      case "view_3d_structure":
        return "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700";
      case "compare_structures":
        return "bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700";
      case "explore_similar":
        return "bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700";
      case "export_data":
        return "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700";
      case "external_link":
        return "bg-gradient-to-r from-gray-600 to-slate-600 hover:from-gray-700 hover:to-slate-700";
      case "search_mutations":
        return "bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700";
      case "download_local_pdb":
        return "bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700";
      case "view_local_structure":
        return "bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700";
      default:
        return "bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800";
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`px-4 py-2 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all ${getButtonColor()}`}
    >
      {action.label}
    </button>
  );
}
