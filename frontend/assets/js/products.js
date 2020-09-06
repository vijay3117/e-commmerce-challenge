$(document).ready(function() {
	var filterApplied = {
		range: 0,
		search: ''
	};
	var products = [];

	/** Get Products */
	function getProducts(items) {
	
		var productsList = '';
		var productsData = {
			isAddWrapper: true,
			itemIndex: 1
		};
		for(var i=0;i<items.length;i++) {		
			
			if (productsData.isAddWrapper) {
				productsList += '<div style="display: flex;width: 100%;">';
				productsData.isAddWrapper = false;
			}
			if (productsData.itemIndex === 4) {
				productsData.itemIndex = 1;
				productsData.isAddWrapper = true;
			} else {
				productsData.itemIndex++;
			}	
			
			productsList += '<div style="width: 25%"><p><img src="assets/img/product-'+ (i+1) +'.jpg" style="width: 100px;height: 100px" alt="product 1"/></p><p>'+ items[i].name +'  '+items[i].currency+''+ items[i].price +'</p></div>';	
			
			if (productsData.isAddWrapper) {
				productsList += '</div>';
			}
			
		}
		
		if (!items.length) {
			$('#products-view').html('<p class="text-center">No products found...</p>');
		} else {		
			$('#products-view').html(productsList);
		}
	}

	/** Search  */
	function searchProducts(isPriceFilter) {
		
		var getFilteredData = [];
		for(var j=0;j<products.length;j++) {
			if(filterApplied.range) {
				if (parseFloat(products[j].price) > parseFloat(filterApplied.range)) {
					if (filterApplied.search && products[j].name.toLowerCase().includes(filterApplied.search) || products[j].price.includes(filterApplied.search)) {
						getFilteredData.push(products[j]);
					}
				}
			} else if (filterApplied.search){
				if (filterApplied.search && products[j].name.toLowerCase().includes(filterApplied.search) || products[j].price.includes(filterApplied.search)) {
					getFilteredData.push(products[j]);
				}
			} else {
				getFilteredData = products;
			}
		}
			
		getProducts(getFilteredData);
	
	}


	// Get server data	
	$('#products-view').html('<p class="text-center">Loading...</p>');
	$.ajax('http://localhost:3200/products-list', {
		type: 'GET',  // http method
		success: function (data, status, xhr) {
			products = data;
			getProducts(products); // Get Products
		},
		error: function (jqXhr, textStatus, errorMessage) {
			$('#products-view').html('<p class="text-center">Error Occured.. Try later</p>');
		}
	});

	
	/** Slider */
	$("#range").on('change', function(){
		$('#selected-range').html(this.value);
		filterApplied.range = this.value;
		searchProducts('Price Filter');
	});
	
		/** Filter */
	$('#search').keyup(function() {
		filterApplied.search = this.value;
		searchProducts();

	});


});