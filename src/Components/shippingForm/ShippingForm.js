import { StateDropdown } from "./StateDropdown";

export function ShippingForm() {
  return (
    <form className="shipping-form">
      <fieldset className="address-fieldset">
        <input type="text" name="addr_line_1" id="addr_line_1" />
        <input type="text" name="addr_line_2" id="addr_line_2" />
        <input type="text" name="city" id="city" />
        <StateDropdown />
        <input type="text" name="zip" id="zip" />
        <input type="text" name="residential" id="residential" />
      </fieldset>
    </form>
  )
}