import convertWordsStateIntoString from "./convertWordsStateIntoString";

export default function handleOnChangeCallback() {
  this.props.onChange(convertWordsStateIntoString(this.state.words));
}
  