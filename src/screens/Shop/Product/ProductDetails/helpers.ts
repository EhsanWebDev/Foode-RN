function calculateTotal(subExtras) {
  let total = 0;

  subExtras.forEach(subExtra => {
    const price = parseFloat(subExtra.price);
    const quantity = subExtra.quantity || 0;
    total += price * quantity;
  });

  return total.toFixed(2); // Round to 2 decimal places for currency
}

export function calculateTotals(data = []) {
  const totals = [];

  data.forEach(item => {
    const total = calculateTotal(item.sub_extras);
    totals.push({
      extra_name: item.extra_name,
      total: `${total}`,
    });
  });

  return totals;
}

//! Satisfy extra items
function isMinSatisfied(item) {
  const checkedSubExtras = item.sub_extras.filter(subExtra => subExtra.checked);
  return checkedSubExtras.length >= item.min;
}

function isMaxSatisfied(item) {
  const checkedSubExtras = item.sub_extras.filter(subExtra => subExtra.checked);

  return checkedSubExtras.length <= item.max;
}
export function areAllItemsSatisfied(data = []) {
  return data.every(item => isMinSatisfied(item) && isMaxSatisfied(item));
}

//? Manage extra quantity

export const increaseQuantity = (extra_id, sub_extra_id, data, stateSetter) => {
  const up = (data || []).map(extraItem => {
    const {outer_id} = extraItem || {};
    if (outer_id === extra_id) {
      const {sub_extras} = extraItem || {};

      const upSub = (sub_extras || []).map(subItem => {
        if (subItem?.id === sub_extra_id) {
          return {
            ...subItem,
            quantity: (subItem.quantity || 0) + 1,
            checked: true,
          };
        }
        return subItem;
      });

      return {
        ...extraItem,
        sub_extras: upSub,
      };
    }
    return extraItem;
  });
  stateSetter(up);
};
export const decreaseQuantity = (extra_id, sub_extra_id, data, stateSetter) => {
  const up = (data || []).map(extraItem => {
    const {outer_id} = extraItem || {};
    if (outer_id === extra_id) {
      const {sub_extras} = extraItem || {};

      const upSub = (sub_extras || []).map(subItem => {
        if (subItem?.id === sub_extra_id) {
          return {
            ...subItem,
            quantity: subItem?.quantity > 0 ? (subItem.quantity || 0) - 1 : 0,
            checked: subItem?.quantity > 1,
          };
        }
        return subItem;
      });

      return {
        ...extraItem,
        sub_extras: upSub,
      };
    }
    return extraItem;
  });
  stateSetter(up);
};
export const toggleExtraItem = (
  extra_id: any,
  sub_extra_id: any,
  data,
  stateSetter,
) => {
  const up = (data || []).map(extraItem => {
    const {outer_id} = extraItem || {};
    if (outer_id === extra_id) {
      const {sub_extras} = extraItem || {};

      const upSub = (sub_extras || []).map(subItem => {
        if (subItem?.id === sub_extra_id) {
          return {
            ...subItem,
            quantity: subItem?.checked ? 0 : (subItem.quantity || 0) + 1,
            checked: !subItem?.checked,
          };
        }
        return subItem;
      });

      return {
        ...extraItem,
        sub_extras: upSub,
      };
    }
    return extraItem;
  });
  stateSetter(up);
};
