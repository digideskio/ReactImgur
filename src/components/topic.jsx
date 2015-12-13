var React = require('react');
var Actions = require('../actions');
var ImageStore = require('../stores/image-store');
var Reflux = require('reflux');
var ImagePreview = require('./image-preview');

module.exports = React.createClass({
	mixins: [
		Reflux.listenTo(ImageStore, 'onChange')
	],
	getInitialState: function() {
		return {
			images: []
		}
	},
	componentWillMount: function() {
		console.log('topic is about to render and fetch data');
		Actions.getImages(this.props.params.id);
	},
	componentWillReceiveProps: function(nextProps) {
		console.log('topic is receiving new props');
		Actions.getImages(nextProps.params.id)
	},
	render: function() {
		return <div className="topic">
			{this.renderImages()}
		</div>
	},
	renderImages: function() {
		return this.state.images.map(function(image) {
			return <ImagePreview key={image.id} {...image} />
		}.bind(this));
	},
	onChange: function(event, images) {
		this.setState({images: images})
	}
});