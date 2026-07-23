onetype.AddonReady('elements', (elements) =>
{
    elements.Item({
        id: 'admin-form-textarea',
        addon: 'admin',
        name: 'Textarea',
        description: 'Multi-line text input with auto-resize, character counter and focus ring.',
        collection: 'Home',
        config: admin.Fn('make.textarea.config'),
        render: function()
        {
            this.length = this.value ? this.value.length : 0;

            this.Compute(() =>
            {
                this.showCounter = this.counter && this.maxlength > 0;
            });

            this.classes = () =>
            {
                const list = ['box', 'bg-' + this.background];

                if(this.disabled)
                {
                    list.push('disabled');
                }

                return list.join(' ');
            };

            this.resizeTextarea = () =>
            {
                if(!this.autoResize)
                {
                    return;
                }

                const textarea = this.Element ? this.Element.querySelector('textarea') : null;

                admin.Fn('do.textarea.resize', textarea, this.rows, this.minRows, this.maxRows);
            };

            this.OnReady(() =>
            {
                this.resizeTextarea();
            });

            this.input = ({ event, value }) =>
            {
                this.value = value;
                this.length = value.length;
                this.resizeTextarea();

                if(this._input)
                {
                    this._input({ event, value });
                }
            };

            this.change = ({ event, value }) =>
            {
                this.value = value;
                this.length = value.length;

                if(this._change)
                {
                    this._change({ event, value });
                }
            };

            this.keydown = ({ event, value }) =>
            {
                if(event.key !== 'Enter' || event.shiftKey || !this._enter)
                {
                    return;
                }

                event.preventDefault();

                if(!value.trim())
                {
                    return;
                }

                this._enter({ value });

                this.value = '';
                this.length = 0;
                event.target.value = '';
                this.resizeTextarea();
            };

            this.focus = ({ event, value }) =>
            {
                if(this._focus)
                {
                    this._focus({ event, value });
                }
            };

            this.blur = ({ event, value }) =>
            {
                if(this._blur)
                {
                    this._blur({ event, value });
                }
            };

            return `
                <div :class="classes()">
                    <textarea
                        :placeholder="placeholder"
                        :name="name"
                        :rows="rows"
                        :maxlength="maxlength"
                        :disabled="disabled"
                        :readonly="readonly"
                        :style="'resize: ' + (autoResize ? 'none' : resize)"
                        autocomplete="off"
                        ot-input="input"
                        ot-change="change"
                        ot-focus="focus"
                        ot-blur="blur"
                        ot-keydown="keydown"
                    >{{ value }}</textarea>
                    <div ot-if="showCounter" class="counter">
                        <span :class="length >= maxlength ? 'full' : ''">{{ length }}</span>
                        <span class="slash">/</span>
                        <span>{{ maxlength }}</span>
                    </div>
                </div>
            `;
        }
    });
});
