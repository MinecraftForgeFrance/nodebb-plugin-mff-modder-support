<div class="acp-page-container">
	<!-- IMPORT admin/partials/settings/header.tpl -->

	<div class="row m-0">
		<div id="spy-container" class="col-12 px-0 mb-4" tabindex="0">
			<form class="form mff-modder-support-settings">
				<div class="mb-4">
					<h5 class="fw-bold tracking-tight settings-header">Main settings</h5>

                    <label for="supportCategoryId">
                        Support category
                    </label>
                    <select class="form-control" id="supportCategoryId" class="form-control" name="supportCategoryId">
                    {{{ each categories }}}
                        <option value="{categories.cid}">{categories.name}</option>
                    {{{ end }}}
					</select>
				</div>
			</form>
		</div>
	</div>
</div>
