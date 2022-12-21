export default {
  beforeMount(el, binding) {
    let iconClass = `fa fa-${binding.value} text-xl `;

    if (binding.modifiers.black) {
      iconClass += " text-black-400";
    } else {
      iconClass += " text-green-400";
    }

    if (binding.modifiers.right) {
      iconClass += " float-right";
    }

    el.innerHTML += `<i class="${iconClass}"></i>`;
  },
};
