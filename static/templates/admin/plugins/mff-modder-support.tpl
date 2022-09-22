<form role="form" class="mff-modder-support-settings">
	<div class="row">
		<div class="col-xs-12">
            <div class="panel panel-default">
                <div class="panel-heading">MFF Support settings</div>
                <div class="panel-body">
                    <div class="row">
                        <div class="col-lg-6 col-xs-12">
                            <div class="form-group">
                                <label for="supportCategoryId">
                                    Support category
                                </label>
                                <select class="form-control" id="supportCategoryId" class="form-control" name="supportCategoryId">
								{{{ each categories }}}
								    <option value="{categories.cid}">{categories.name}</option>
								{{{ end }}}
							</select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
		</div>
	</div>
</form>

<button id="save" class="floating-button mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored">
	<i class="material-icons">save</i>
</button>
