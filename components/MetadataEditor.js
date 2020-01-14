import { Component } from "react";

import "../css/app.css";

import { connect } from "react-redux";
import { purchase } from "../store";

import Box from "3box";

class MetadataEditor extends Component {
  state = {
    loading: false
  };

  async getAddressFromMetaMask() {
    if (typeof window.ethereum == "undefined") {
      this.setState({ needToAWeb3Browser: true });
    } else {
      window.ethereum.autoRefreshOnNetworkChange = false;
      const accounts = await window.ethereum.enable();
      this.setState({ accounts });
    }
  }

  async componentDidMount() {
    await this.getAddressFromMetaMask();

    const provider =
      this.props.drizzle === undefined
        ? window.ethereum
        : this.props.drizzle.web3.eth.currentProvider;
    const account = this.state.accounts[0];

    console.log(`account = ${account}`);

    console.log("Getting address from metamask");
    /*
		console.log('Box.getIPFS()')
		const ipfs = await Box.getIPFS()
		console.log(ipfs)
		*/

    const profile = await Box.getProfile(account);
    console.log(`Account ${account} profile`);
    console.log(profile);

    const spaces = await Box.listSpaces(this.state.accounts[0]);
    console.log(`spaces of address ${this.state.accounts[0]}`);
    console.log(spaces);

    const spaceName = "metadata-store";
    const space = await Box.getSpace(this.state.accounts[0], spaceName);
    console.log(`space '${spaceName}' of address ${this.state.accounts[0]}`);
    console.log(space);

    console.log("Box.isLoggedIn(account)");
    console.log(Box.isLoggedIn(account));

    console.log("Opening box");
    const box = await Box.openBox(account, provider);

    this.setState({ box });
    // Sync 3Box
    await box.syncDone;
    console.log("OPENED box");
    /*
		console.log('Creating box')
		const box = await Box.create(provider)
		console.log('Created box')
		*/

    this.setState({ box });
  }

  render() {
    console.log("this.state");
    console.log(this.state);
    console.log("this.props");
    console.log(this.props);

    if (this.props.applicationInfo === undefined)
      return "Application info is not loaded";
    if (!this.props.isIdentified) return "please identify yourself";
    if (this.props.userID !== this.props.applicationInfo.developer)
      return "You are not the developer";
    return "All ok";
  }
}
/*
const mapStateToProps = ({
  applications,
  isIdentified,
  purchasedApplications,
  userID
}) => ({ applications, isIdentified, purchasedApplications, userID });
const mapDispatchToProps = { purchase };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MetadataEditor);
*/

export default MetadataEditor;
